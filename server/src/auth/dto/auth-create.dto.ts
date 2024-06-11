import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length, NotContains, ValidateIf } from "class-validator";

export class AuthCreateDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 1
    })
    @NotContains(" ") // 공백포함 X
    password: string;

    confirmPassword: string;

    @IsAlphanumeric() // 문자만 or 숫자만 입력해도 ok인지 확인 테스트 성공
    // 한글도 되게 수정하기? 포기?
    @Length(2, 25)
    @NotContains(" ") // 공백포함 X
    nickName: string;
}
