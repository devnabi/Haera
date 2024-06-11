import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
