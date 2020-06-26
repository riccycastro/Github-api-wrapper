import {Injectable, NestMiddleware, NotAcceptableException} from "@nestjs/common";
import {Request} from "express";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ValidateApplicationJsonMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
    ) {
    }

    use(req: Request, res: Response, next: Function) {
        const accept = this.configService.get<string>('HEADER_ACCEPT', 'application/json');
        if (req.header('accept') !== accept) {
            throw new NotAcceptableException(`Accept header must be ${accept}`)
        }

        next();
    }
}
