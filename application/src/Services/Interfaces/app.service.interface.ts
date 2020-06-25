import {RepositoryDto} from "../../Dtos/repository.dto";

export interface AppServiceInterface {
    getRepository(username: string): Promise<RepositoryDto[]>
}
