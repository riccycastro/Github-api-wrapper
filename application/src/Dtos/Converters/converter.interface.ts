export interface ConverterInterface<Dto, Type> {
    convertToDto(data: Type): Dto;
    toDto(data: Type): Dto;
    toArrayOfDto(data: Type[]): Dto[];
}
