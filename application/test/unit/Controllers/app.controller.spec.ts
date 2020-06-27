import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from '../../../src/Controllers/app.controller';
import {AppService} from '../../../src/Services/app.service';
import {AppServiceInterface} from "../../../src/Services/Interfaces/app.service.interface";

const data  = require('../../helpers/payloads/repository.json');


describe('AppController', () => {
  let appController: AppController;
  let appService: AppServiceInterface;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'AppServiceInterface',
          useExisting: AppService,
        },
        {
          provide: 'GitHubClientInterface',
          useValue: {},
        },
        {
          provide: 'RepositoryConverterInterface',
          useValue: {},
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {},
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getRepositories', () => {
    it('should return a RepositoryDto array', async () => {
      const repositoryDtoData = data.repositoriesDto

      const getRepositorySpy = jest
          .spyOn(appService, 'getRepositories')
          .mockImplementation(async () => repositoryDtoData);

      const expectedResult = JSON.parse(JSON.stringify(repositoryDtoData));

      expect(await appController.getRepositories('phakeUsername')).toEqual(expectedResult);
      expect(getRepositorySpy).toHaveBeenCalledTimes(1);
    });

    it('should return an empty RepositoryDto array', async() => {
      const getRepositorySpy = jest
          .spyOn(appService, 'getRepositories')
          .mockImplementation(async () => []);

      expect(await appController.getRepositories('phakeUsername')).toEqual([]);
      expect(getRepositorySpy).toHaveBeenCalledTimes(1);
    })
  });
});
