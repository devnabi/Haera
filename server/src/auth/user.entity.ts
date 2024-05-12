import { IsNumberString, IsEmail, MaxLength, IsStrongPassword, IsAlphanumeric, Length, NotContains} from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['nickname'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @IsNumberString()
    id: number;

    @Column()
    @IsEmail()
    @MaxLength(100)
    email: string;

    @Column()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    // @NotContains("") 공백포함 X -> 테스트를 해본 후 추가할지 말지 보기
    password: string;

    @Column()
    @IsAlphanumeric() // 문자와 숫자 모두가 아니라, 문자만 or 숫자만 입력해도 ok인지 확인 테스트
    @Length(2, 25)
    @NotContains("")
    nickname: string;
}
