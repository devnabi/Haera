import { IsAlphanumeric, IsEmail, IsNotEmpty, IsStrongPassword, Length, MaxLength, NotContains } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    @NotContains(" ") // 공백포함 X
    password: string;

    @IsNotEmpty()
    @IsAlphanumeric() // 문자만 or 숫자만 입력해도 ok인지 확인 테스트 성공
    // 한글도 되게 수정하기? 포기?
    @Length(2, 25)
    @NotContains(" ") // 공백포함 X
    nickname: string;
}
