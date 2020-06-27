import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
    catch(error: Error, host: ArgumentsHost) {
        let response = host.switchToHttp().getResponse();

        if (error instanceof HttpException) {
            return response
                .status(error.getStatus())
                .send({
                    status: error.getStatus(),
                    Message: error.message.message
                });
        }

        // log critical error
        console.log(error)

        return response
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                Message: error.message
            })
    }
}
