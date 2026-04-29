import { ApiProperty } from "@nestjs/swagger";
import {IsInt,  IsOptional, Min} from "class-validator";
import {Type} from "class-transformer";

export class PaginationFilter{
    @ApiProperty({required:false})
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(()=>Number)
    page?:number

    @ApiProperty({required:false})
    @IsInt()
    @IsOptional()
    @Min(1)
    @Type(()=>Number)
    size?:number
}