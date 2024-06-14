import { Type } from "class-transformer"
import { IsInt, IsOptional, Min } from "class-validator"

export class PaginationDto {

    @IsOptional()
    @Type(()=> Number)
    currentPage: number

    @IsOptional()
    @Type(()=> Number)
    @Min(1)
    perPage: number

    @IsOptional()
    listStatus: boolean | string
}
