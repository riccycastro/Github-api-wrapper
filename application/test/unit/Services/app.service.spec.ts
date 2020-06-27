import {AppService} from "../../../src/Services/app.service";
import {Test, TestingModule} from "@nestjs/testing";
import {ConverterInterface} from "../../../src/Dtos/Converters/Interfaces/converter.interface";
import {RepositoryConverter} from "../../../src/Dtos/Converters/repository.converter";
import {RepositoryDto} from "../../../src/Dtos/repository.dto";
import {RepositoryRetrieved} from "../../../src/Types/type";
import {GitHubClient} from "../../../src/Services/git-hub.client";
import {GitHubClientInterface} from "../../../src/Services/Interfaces/git-hub.client.interface";
import {ConfigService} from "@nestjs/config";

const data = require('../../helpers/payloads/repository.json');

describe('AppService', () => {
    let appService: AppService;
    let repositoryConverter: ConverterInterface<RepositoryDto, RepositoryRetrieved>;
    let gitHubClient: GitHubClientInterface;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                RepositoryConverter,
                GitHubClient,
                {
                    provide: 'RepositoryConverterInterface',
                    useExisting: RepositoryConverter,
                },
                {
                    provide: 'GitHubClientInterface',
                    useExisting: GitHubClient,
                },
                {
                    provide: 'BranchConverterInterface',
                    useValue: {},
                },
                {
                    provide: 'RequestProviderInterface',
                    useValue: {},
                },
                ConfigService
            ]
        }).compile();

        repositoryConverter = app.get<RepositoryConverter>(RepositoryConverter);
        gitHubClient = app.get<GitHubClient>(GitHubClient);
        appService = app.get<AppService>(AppService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getRepositories', () => {
        it('should return a RepositoryDto array', async () => {
            const sourceRepositories = data.sourceRepositories;

            const getRepositoriesSpy = jest
                .spyOn(gitHubClient, 'getRepositories')
                .mockImplementation(async () => sourceRepositories);

            const removeForkRepositoriesSpy = jest
                .spyOn(gitHubClient, 'removeForkRepositories')
                .mockImplementation(() => sourceRepositories);

            const getBranchesSpy = jest
                .spyOn(appService, 'getBranches')
                .mockImplementation(async () => data.sourceBranches)

            const toArrayOfDtoSpy = jest
                .spyOn(repositoryConverter, 'toArrayOfDto')
                .mockImplementation(() => data.repositoriesDto);

            const expectedResult = JSON.parse(JSON.stringify(data.repositoriesDto));

            expect(await appService.getRepositories('phakeUsername'))
                .toEqual(expectedResult);

            expect(getRepositoriesSpy).toHaveBeenCalledTimes(1)
            expect(getBranchesSpy).toHaveBeenCalledTimes(3)
            expect(removeForkRepositoriesSpy).toHaveBeenCalledTimes(1)
            expect(toArrayOfDtoSpy).toHaveBeenCalledTimes(1)
        });

        it('should return an empty array', async () => {
            const getRepositoriesSpy = jest
                .spyOn(gitHubClient, 'getRepositories')
                .mockImplementation(async () => []);

            const removeForkRepositoriesSpy = jest
                .spyOn(gitHubClient, 'removeForkRepositories')
                .mockImplementation(() => []);

            const toArrayOfDtoSpy = jest
                .spyOn(repositoryConverter, 'toArrayOfDto')
                .mockImplementation(() => []);

            expect(await appService.getRepositories('phakeUsername'))
                .toEqual([]);

            expect(getRepositoriesSpy).toHaveBeenCalledTimes(1)
            expect(removeForkRepositoriesSpy).toHaveBeenCalledTimes(1)
            expect(toArrayOfDtoSpy).toHaveBeenCalledTimes(1)
        });
    });

    describe('getBranches', () => {
        it('should add branches to repository', async () => {
            const getBranchesSpy = jest
                .spyOn(gitHubClient, 'getBranches')
                .mockImplementation(async () => data.sourceBranches);

            const repositoryRetrieved: RepositoryRetrieved = {
                name: 'repo 1',
                owner: {
                    login: 'owner 1'
                },
                fork: false,
                branches: []
            };

            const expectedResult = JSON.parse(JSON.stringify(repositoryRetrieved));
            expectedResult.branches = data.sourceBranches;

            expect(await appService.getBranches('phakeUsername', repositoryRetrieved))
                .toEqual(expectedResult)
            expect(getBranchesSpy).toHaveBeenCalledTimes(1)
        });

        it('should add an empty branch array', async () => {
            const getBranchesSpy = jest
                .spyOn(gitHubClient, 'getBranches')
                .mockImplementation(async () => []);

            const repositoryRetrieved: RepositoryRetrieved = {
                name: 'repo 1',
                owner: {
                    login: 'owner 1'
                },
                fork: false,
                branches: []
            };
            const expectedResult = JSON.parse(JSON.stringify(repositoryRetrieved));
            expectedResult.branches = [];
            
            expect(await appService.getBranches('phakeUsername', repositoryRetrieved))
                .toEqual(expectedResult)
            expect(getBranchesSpy).toHaveBeenCalledTimes(1)
        });
    });
});
