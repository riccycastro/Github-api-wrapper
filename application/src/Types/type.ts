export interface RepositoryRetrieved {
    name: string;
    owner: {
        login: string
    },
    fork: boolean,
    branches: BranchRetrieved[]
}

export interface BranchRetrieved {
    name: string;
    commit: {
        sha: string;
    }
}
