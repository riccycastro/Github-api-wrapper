import {BranchConverter} from "../../../../src/Dtos/Converters/branch.converter";
import {BranchDto} from "../../../../src/Dtos/branch.dto";

const data = require('../../../helpers/payloads/repository.json');

describe('BranchConverter', () => {
    let branchConverter: BranchConverter;

    beforeAll(() => {
        branchConverter = new BranchConverter();
    });

    describe('toDto', () => {
        it('should return a BranchDto', () => {
            const expectedBranchDto = new BranchDto();
            expectedBranchDto.name = 'LyaLya-pie-patch';
            expectedBranchDto.sha = '0f69ad5cf7ff57e91487568cdd2d9c8a9d2e855a';

            expect(
                branchConverter.toDto(data.sourceBranches[0])
            ).toEqual(expectedBranchDto);
        });
    });

    describe('toArrayOfDto', () => {
        it('should return a BranchDto array', () => {
            const expectedBranchesDtoList: BranchDto[] = [];

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

            expectedBranchesDtoList.push(expectedBranchDto);
            expectedBranchesDtoList.push(expectedBranchDto2);
            expectedBranchesDtoList.push(expectedBranchDto3);
            expectedBranchesDtoList.push(expectedBranchDto4);

            expect(
                branchConverter.toArrayOfDto(data.sourceBranches)
            ).toEqual(expectedBranchesDtoList);
        });
    });
});
