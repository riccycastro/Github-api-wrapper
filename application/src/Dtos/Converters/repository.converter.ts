import {AbstractDtoConverter} from "./abstract.dto.converter";
import {RepositoryDto} from "../repository.dto";
import {Inject, Injectable} from "@nestjs/common";
import {BranchRetrieved, RepositoryRetrieved} from "../../Types/type";
import {ConverterInterface} from "./Interfaces/converter.interface";
import {BranchDto} from "../branch.dto";

@Injectable()
export class RepositoryConverter extends AbstractDtoConverter<RepositoryDto, RepositoryRetrieved> {
    constructor(
        @Inject('BranchConverterInterface') private readonly branchConverter: ConverterInterface<BranchDto, BranchRetrieved>
    ) {
        super();
    }

    convertToDto(data: RepositoryRetrieved): RepositoryDto {
        const repositoryDto = new RepositoryDto();

        repositoryDto.name = data.name;
        repositoryDto.ownerLogin = data.owner.login

        if (data.branches && Array.isArray(data.branches)) {
            repositoryDto.branches = this.branchConverter.toArrayOfDto(data.branches);
        }

        return repositoryDto;
    }
}
