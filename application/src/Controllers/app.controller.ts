import {CacheInterceptor, CacheTTL, Controller, Get, Inject, Param, UseInterceptors} from '@nestjs/common';
import {AppServiceInterface} from "../Services/Interfaces/app.service.interface";
import {RepositoryDto} from "../Dtos/repository.dto";

@Controller('users')
export class AppController {
    constructor(
        @Inject('AppServiceInterface') private readonly  appService: AppServiceInterface,
    ) {
    }

    @UseInterceptors(CacheInterceptor)
    @CacheTTL(10)
    @Get(':username')
    async getRepositories(@Param('username') username: string): Promise<RepositoryDto[]> {
        return await this.appService.getRepositories(username);
    }
}
