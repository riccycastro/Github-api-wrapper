import {BranchRetrieved, RepositoryRetrieved} from "../../Types/type";

export interface GitHubClientInterface {
    getRepositories(username: string): Promise<RepositoryRetrieved[]>;
    getBranches(username: string, repositoryName: string): Promise<BranchRetrieved[]>;
    removeForkRepositories(repositories: RepositoryRetrieved[]): RepositoryRetrieved[]
}
