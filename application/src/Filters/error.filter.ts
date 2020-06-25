import {ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, NotFoundException} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();
        let status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

        if (error instanceof NotFoundException) {
            return response.status(status).send({status: HttpStatus.NOT_FOUND, Message: error.message.message});
        }

        return response.status(500).send(error.message)
    }
}
