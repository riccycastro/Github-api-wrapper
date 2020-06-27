import {BranchConverter} from "../../../../src/Dtos/Converters/branch.converter";
import {RepositoryConverter} from "../../../../src/Dtos/Converters/repository.converter";
import {RepositoryDto} from "../../../../src/Dtos/repository.dto";
import {BranchDto} from "../../../../src/Dtos/branch.dto";

const data = require('../../../helpers/payloads/repository.json');

describe('BranchConverter', () => {
    let repositoryConverter: RepositoryConverter;
    let branchConverter: BranchConverter;

    beforeAll(() => {
        branchConverter = new BranchConverter();
        repositoryConverter = new RepositoryConverter(branchConverter);
    });

    describe('toDto', () => {
        it('should return a RepositoryDto', () => {
            const expectedRepositoryDto = new RepositoryDto();
            expectedRepositoryDto.ownerLogin = 'octocat';
            expectedRepositoryDto.name = 'boysenberry-repo-1';
            expectedRepositoryDto.branches = [];

            expect(repositoryConverter.toDto(data.sourceRepositories[0]))
                .toEqual(expectedRepositoryDto);
        });

        it('should return a RepositoryDto with branches', () => {
            const sourceRepository = JSON.parse(JSON.stringify(data.sourceRepositories[0]));
            sourceRepository.branches = data.sourceBranches;

            const expectedRepositoryDto = new RepositoryDto();
            expectedRepositoryDto.ownerLogin = 'octocat';
            expectedRepositoryDto.name = 'boysenberry-repo-1';

            const expectedBranchDto = new BranchDto();
            expectedBranchDto.name = 'LyaLya-pie-patch';
            expectedBranchDto.sha = '0f69ad5cf7ff57e91487568cdd2d9c8a9d2e855a';

            const expectedBranchDto2 = new BranchDto();
            expectedBranchDto2.name = 'jmarlena-patch-1';
            expectedBranchDto2.sha = 'a6f5072795a54e9024fed3431faf13880a89cad2';

            const expectedBranchDto3 = new BranchDto();
            expectedBranchDto3.name = 'master';
            expectedBranchDto3.sha = 'd09e445076bbcd163fc9abfbe6d2fce09a611281';

            const expectedBranchDto4 = new BranchDto();
            expectedBranchDto4.name = 'octocat-patch-1';
            expectedBranchDto4.sha = 'fd6b08e5363774c215703ee918967c646dfd3565';

            expectedRepositoryDto.branches.push(expectedBranchDto);
            expectedRepositoryDto.branches.push(expectedBranchDto2);
            expectedRepositoryDto.branches.push(expectedBranchDto3);
            expectedRepositoryDto.branches.push(expectedBranchDto4);

            expect(repositoryConverter.toDto(sourceRepository)).toEqual(expectedRepositoryDto);
        });
    });

    describe('toArrayOfDto', () => {
        it('should return a RepositoryDto array', () => {
            const expectedRepositoriesDtoList: RepositoryDto[] = [];

            const repositoryDto = new RepositoryDto();
            repositoryDto.name = 'boysenberry-repo-1';
            repositoryDto.ownerLogin = 'octocat';

            const repositoryDto2 = new RepositoryDto();
            repositoryDto2.name = 'git-consortium';
            repositoryDto2.ownerLogin = 'octocat';

            const repositoryDto3 = new RepositoryDto();
            repositoryDto3.name = 'hello-worId';
            repositoryDto3.ownerLogin = 'octocat';

            expectedRepositoriesDtoList.push(repositoryDto);
            expectedRepositoriesDtoList.push(repositoryDto2);
            expectedRepositoriesDtoList.push(repositoryDto3);

            expect(repositoryConverter.toArrayOfDto(data.sourceRepositories)).toEqual(expectedRepositoriesDtoList);
        });
    });
});
