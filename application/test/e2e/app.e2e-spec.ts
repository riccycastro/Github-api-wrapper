import {Test, TestingModule} from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from '../../src/app.module';
import {ErrorFilter} from "../../src/Filters/error.filter";

const data = require('../helpers/payloads/repository.json')

describe('AppController (e2e)', () => {
    let app: INestApplication;
    let axiosProvider = {
        get: async (url: string) => {
            return []
        }
    }

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: 'APP_FILTER',
                    useClass: ErrorFilter
                },
            ]
        })
            .overrideProvider('RequestProviderInterface')
            .useValue(axiosProvider)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('should not accept empty header Accept property', () => {
        return request(app.getHttpServer())
            .get('/octocat')
            .expect({
                status: 406,
                Message: 'Accept header must be application/json'
            })
            .expect(HttpStatus.NOT_ACCEPTABLE);
    });

    it('should not accept invalid header Accept property', () => {
        return request(app.getHttpServer())
            .get('/octocat')
            .set('Accept', 'application/xml')
            .expect({
                status: 406,
                Message: 'Accept header must be application/json'
            })
            .expect(HttpStatus.NOT_ACCEPTABLE);
    });

    it('should throw NotFoundException if username not found', () => {
        axiosProvider.get = async () => {
            throw {
                response: {
                    status: HttpStatus.NOT_FOUND
                }
            }
        }

        return request(app.getHttpServer())
            .get('/users/octocatsssssssss')
            .set('Accept', 'application/json')
            .expect(HttpStatus.NOT_FOUND)
            .expect({
                status: 404,
                Message: 'username octocatsssssssss not found'
            });
    });

    it('should throw an InternalServer error if another error happens', () => {
        axiosProvider.get = async () => {
            throw {
                response: {
                    status: HttpStatus.FORBIDDEN
                }
            }
        }

        return request(app.getHttpServer())
            .get('/users/octocat')
            .set('Accept', 'application/json')
            .expect(HttpStatus.INTERNAL_SERVER_ERROR)
            .expect({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                Message: 'Something went wrong while trying to fulfill your request. Please try again later'
            });
    });

    it('should return the repositories', () => {
        // Since we are mocking the get() method and it's used for getRepositories and getBranches request
        // We need to make it return different payloads in different moments, so the first time we know
        // That it's the repository request and the follow ones are the branches
        let counter = 1;
        axiosProvider.get = async (url: string) => {
            if (counter === 1) {
                counter++;
                return data.sourceRepositories
            } else {
                return data.sourceBranches
            }
        };

        return request(app.getHttpServer())
            .get('/users/octocat')
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .expect(data.repositoriesResult)
    });

    it('should accept empty response', () => {
        axiosProvider.get = async (url: string) => {
            return []
        }

        return request(app.getHttpServer())
            .get('/users/octocat')
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .expect([])
    });

    afterAll(async () => {
        await app.close();
    });
});
