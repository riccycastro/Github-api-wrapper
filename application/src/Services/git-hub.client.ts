import {GitHubClientInterface} from "./Interfaces/git-hub.client.interface";
import {RequestProviderInterface} from "./Provider/Interfaces/requestProviderInterface";
import {Inject, NotFoundException} from "@nestjs/common";
import {BranchRetrieved, RepositoryRetrieved} from "../Types/type";
import {ConfigService} from "@nestjs/config";

export class GitHubClient implements GitHubClientInterface {

    private readonly baseUrl: string;

    constructor(
        @Inject('RequestProviderInterface') private readonly requestProvider: RequestProviderInterface,
        private readonly configService: ConfigService
    ) {
        this.baseUrl = configService.get<string>('GIT_REPOSITORY_API_URL');
    }

    async getRepositories(username: string) {
        try {
            return await this.requestProvider.get(`${this.baseUrl}/users/${username}/repos`)
        } catch (e) {
            console.log(username, e)

            if (e?.response?.status === 404) {
                throw new NotFoundException(`username ${username} not found`);
            }
            throw e;
        }
    }

    async getBranches(username: string, repositoryName: string): Promise<BranchRetrieved[]> {
        try {
            return await this.requestProvider.get(`${this.baseUrl}/repos/${username}/${repositoryName}/branches`)
        } catch (e) {
            console.log(username, repositoryName, e)

            if (e?.response?.status === 404) {
                throw new NotFoundException(`branches for repository ${repositoryName} not found`);
            }
            throw e;
        }
    }

    removeForkRepositories(repositories: RepositoryRetrieved[]): RepositoryRetrieved[] {
        return repositories.filter(repository => !repository.fork)
    }

}
