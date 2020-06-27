import {GitHubClient} from "../../../src/Services/git-hub.client";
import {Test, TestingModule} from "@nestjs/testing";
import {AxiosProvider} from "../../../src/Services/Provider/axios.provider";
import {RequestProviderInterface} from "../../../src/Services/Provider/Interfaces/request.provider.Interface";
import {ConfigService} from "@nestjs/config";
import {NotFoundException} from "@nestjs/common";

const data = require('../../helpers/payloads/repository.json');

describe('GitHubClient', () => {
    let gitHubClient: GitHubClient;
    let axiosProvider: RequestProviderInterface;
    let configService: ConfigService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                GitHubClient,
                AxiosProvider,
                ConfigService,
                {
                    provide: 'RequestProviderInterface',
                    useExisting: AxiosProvider,
                }
            ]
        }).compile();

        gitHubClient = app.get<GitHubClient>(GitHubClient);
        axiosProvider = app.get<AxiosProvider>(AxiosProvider);
        configService = app.get<ConfigService>(ConfigService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getRepositories', () => {
        it('should throw a NotFoundException', async () => {
            const getSpy = jest
                .spyOn(axiosProvider, 'get')
                .mockImplementation(async () => {
                    throw {
                        response: {
                            status: 404
                        }
                    }
                });

            await expect(gitHubClient.getRepositories('phakeName')).rejects.toThrow(NotFoundException)
            expect(getSpy).toHaveBeenCalledTimes(1)
        });

        it('should throw an error', async () => {
            const getSpy = jest
                .spyOn(axiosProvider, 'get')
                .mockImplementation(async () => {
                    throw new Error('phake Error');
                });

            await expect(gitHubClient.getRepositories('phakeName')).rejects.toThrow(
                new Error('phake Error')
            );
            expect(getSpy).toHaveBeenCalledTimes(1)
        });

        it('should return a repositories array', async () => {
            const getSpy = jest
                .spyOn(axiosProvider, 'get')
                .mockImplementation(async () => {
                    return data.sourceRepositories;
                });

            const expectedResult = JSON.parse(JSON.stringify(data.sourceRepositories));

            expect(await gitHubClient.getRepositories('phakeName')).toEqual(
                expectedResult
            );
            expect(getSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('getBranches', () => {
        it('should throw a NotFoundException', async () => {
            const getSpy = jest
                .spyOn(axiosProvider, 'get')
                .mockImplementation(async () => {
                    throw {
                        response: {
                            status: 404
                        }
                    }
                });

            await expect(gitHubClient.getBranches('phakeName', 'pahkeRepositoryName'))
                .rejects
                .toThrow(NotFoundException)
            expect(getSpy).toHaveBeenCalledTimes(1);
        });

        it('should throw an error', async () => {
            const getSpy = jest
                .spyOn(axiosProvider, 'get')
                .mockImplementation(async () => {
                    throw new Error('phake Error');
                });

            await expect(gitHubClient.getBranches('phakeName', 'pahkeRepositoryName'))
                .rejects
                .toThrow(new Error('phake Error'));
            expect(getSpy).toHaveBeenCalledTimes(1)
        });

        it('should return a branches array', async () => {
            const getSpy = jest
                .spyOn(axiosProvider, 'get')
                .mockImplementation(async () => {
                    return data.sourceBranches;
                });

            const expectedResult = JSON.parse(JSON.stringify(data.sourceBranches));
            expect(await gitHubClient.getBranches('phakeName', 'phakeRepositoryName'))
                .toEqual(expectedResult);
            expect(getSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('removeForkRepositories', () => {
        it('should return only the not forked repositories', async () => {
            expect(gitHubClient.removeForkRepositories(data.sourceRepositories)).toEqual(data.notForkRepositories);
        });
    });
});
