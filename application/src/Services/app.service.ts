import {Inject, Injectable} from '@nestjs/common';
import {AppServiceInterface} from "./Interfaces/app.service.interface";
import {GitHubClientInterface} from "./Interfaces/git-hub.client.interface";
import {ConverterInterface} from "../Dtos/Converters/converter.interface";
import {RepositoryDto} from "../Dtos/repository.dto";
import {RepositoryRetrieved} from "../Types/type";

@Injectable()
export class AppService implements AppServiceInterface {

  constructor(
      @Inject('GitHubClientInterface') private readonly gitHubClient: GitHubClientInterface,
      @Inject('RepositoryConverterInterface') private readonly repositoryConverter: ConverterInterface<RepositoryDto, RepositoryRetrieved>,
  ) {
  }

  async getRepositories(username: string): Promise<RepositoryDto[]> {
    const repositories = await this.gitHubClient.getRepositories(username);
    const sourceRepositories = this.gitHubClient.removeForkRepositories(repositories);

    const getBranchTasks: Promise<RepositoryRetrieved>[] = [];

    for (const sourceRepository of sourceRepositories) {
      getBranchTasks.push(this.getBranches(username, sourceRepository));
    }

    return this.repositoryConverter.toArrayOfDto(await Promise.all(getBranchTasks));
  }

  async getBranches(username: string, sourceRepository: RepositoryRetrieved): Promise<RepositoryRetrieved> {
    sourceRepository.branches = await this.gitHubClient.getBranches(username, sourceRepository.name);
    return sourceRepository;
  }
}
