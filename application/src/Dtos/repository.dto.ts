import {BranchDto} from "./branch.dto";

export class RepositoryDto {
    constructor() {
        this.branches = [];
    }

    name: string;
    ownerLogin: string;
    branches: BranchDto[]
}
