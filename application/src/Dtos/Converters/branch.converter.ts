import {AbstractDtoConverter} from "./abstract.dto.converter";
import {BranchRetrieved} from "../../Types/type";
import {BranchDto} from "../branch.dto";

export class BranchConverter extends AbstractDtoConverter<BranchDto, BranchRetrieved> {
    convertToDto(data: BranchRetrieved): BranchDto {
        const branchDto = new BranchDto();
        branchDto.name = data.name;
        branchDto.sha = data.commit.sha;
        return branchDto;
    }
}
