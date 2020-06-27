import {createRequest, createResponse, MockRequest, MockResponse} from 'node-mocks-http';
import {Request, Response} from 'express';
import {HeaderValidatorMiddleware} from "../../../src/Middlewares/header-validator.middleware";
import {ConfigService} from "@nestjs/config";

describe('HeaderValidatorMiddleware', () => {
    let req: any | MockRequest<Request>;
    let res: MockResponse<Response>;
    let headerValidatorMiddleware: HeaderValidatorMiddleware;
    let next = jest.fn();
    let configService: ConfigService;

    beforeAll(() => {
        req = createRequest();
        res = createResponse();
        configService = new ConfigService();
        headerValidatorMiddleware = new HeaderValidatorMiddleware(configService)
    });

    describe('use', () => {
        it('should throw a NotAcceptableException', () => {
            configService.get = () => 'application/json';
            req.header = () => 'application/xml';

            try {
                headerValidatorMiddleware.use(req, res, next)
            } catch (e) {
                expect(e.message).toStrictEqual({
                    "error": "Not Acceptable",
                    "message": "Accept header must be application/json",
                    "statusCode": 406
                });
            }
        });

        it('should call to next', () => {
            configService.get = () => 'application/json';
            req.header = () => 'application/json';

            headerValidatorMiddleware.use(req, res, next);
            expect(next).toHaveBeenCalledTimes(1);
        });
    });
});
