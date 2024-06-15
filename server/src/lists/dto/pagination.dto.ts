import { IsOptional, Min } from "class-validator"

export class PaginationDto {

    @IsOptional()
    @Min(1)
    currentPage: number

    @IsOptional()
    @Min(1)
    perPage: number

    @IsOptional()
    listStatus: boolean
}
