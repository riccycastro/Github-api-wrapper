import {CacheModule, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './Controllers/app.controller';
import {AppService} from './Services/app.service';
import {GitHubClient} from "./Services/git-hub.client";
import {AxiosProvider} from "./Services/Provider/axios.provider";
import {RepositoryConverter} from "./Dtos/Converters/repository.converter";
import {BranchConverter} from "./Dtos/Converters/branch.converter";
import {ConfigModule} from "@nestjs/config";
import {HeaderValidatorMiddleware} from "./Middlewares/header-validator.middleware";

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({isGlobal: true}),
  ],
  controllers: [AppController],
  providers: [
    {provide: 'AppServiceInterface', useClass: AppService},
    {provide: 'GitHubClientInterface', useClass: GitHubClient},
    {provide: 'RequestProviderInterface', useClass: AxiosProvider},
    {provide: 'RepositoryConverterInterface', useClass: RepositoryConverter},
    {provide: 'BranchConverterInterface', useClass: BranchConverter},
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
        .apply(HeaderValidatorMiddleware)
        .forRoutes('*')
  }
}
