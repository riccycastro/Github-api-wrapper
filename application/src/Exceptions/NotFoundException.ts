import {HttpException} from "@nestjs/common/exceptions/http.exception";

export class NotFoundException extends HttpException{
        private Message: string;

    constructor(Message: string) {
        super(Message, 404);

        this.Message = Message;
    }
}
