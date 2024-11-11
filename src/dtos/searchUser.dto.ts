import {IsNotEmpty, isString, IsString} from "class-validator";

export class SearchUserDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    password: string
}