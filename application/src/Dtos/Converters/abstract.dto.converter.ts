import {ConverterInterface} from "./converter.interface";

export abstract class AbstractDtoConverter<Dto, Type> implements ConverterInterface<Dto, Type> {
    abstract convertToDto(data: Type): Dto;

    toDto(data: Type): Dto {
        return this.convertToDto(data)
    }

    toArrayOfDto(data: Type[]): Dto[] {
        const dtos: Dto[] = [];

        for (const item of data) {
            dtos.push(this.toDto(item))
        }

        return dtos;
    }
}
