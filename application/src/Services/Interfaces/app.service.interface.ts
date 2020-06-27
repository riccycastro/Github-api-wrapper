import {RepositoryDto} from "../../Dtos/repository.dto";

export interface AppServiceInterface {
    getRepositories(username: string): Promise<RepositoryDto[]>
}
