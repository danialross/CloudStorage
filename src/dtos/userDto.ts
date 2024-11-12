import {IsNotEmpty, isString, IsString} from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    password: string
}