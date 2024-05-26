import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    private transporter: nodemailer.Transporter;
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT, 10),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    async getAllUser(): Promise<User[]> {
        const users = await this.authRepository.find();
        return users;
    }

    async getEmailExistence(email: string): Promise<Boolean> {
        const emailCheckResult = await this.authRepository.existsBy({ email: email });

        return emailCheckResult;
    }

    async getNickNameExistence(nickName: string): Promise<Boolean> {
        const nickNameCheckResult = await this.authRepository.existsBy({ nickName: nickName });

        return nickNameCheckResult;
    }

    async sendVerificationEmail(token: string) {
        // 가입 성공 시 생성된 토큰에서 페이로드 추출
        const payload = this.jwtService.verify(token);

        // 이메일 인증 링크
        const emailverificationLink = `${process.env.HAERA_URL}/emailverificationsuccess?token=${token}`;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: payload.email,
            Subject: "Welcome to Haera! Verify Your Email Address",
            html: `<h1>Email Verification</h1>
            <p>링크를 누르면 이메일이 인증됩니다.</p>
            <a href= "${emailverificationLink}">Verify Email</a>`
        }

        return await this.transporter.sendMail(mailOptions);
    }

    // 토큰이 일치하는지 확인
    async verifyTokenAndSaveEmail(token: string) {
        const payload = this.jwtService.verify(token);
        const email = payload.email;

        return email;
    }

    // Token으로 인증된 이메일의 상태를 업데이트
    async updateEmailVerificationStatus(email: string) {
        const updateResult = await this.authRepository.update(
            { email },
            { isEmailVerified: true }
        );

        return updateResult;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.authRepository.findOneBy({ id });
        return user;
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { email, password } = authCredentialsDto;
        const user = await this.authRepository.findOneBy({ email });
        if (!user) {
            throw new UnauthorizedException(`Sign in failed.`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException(`Sign in failed.`);
        }

        // 로그인 성공 시 JWT토큰 생성 (Payload + Secret)
        const payload = { email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { email, password, nickName } = authCredentialsDto;
        // 이메일이 DB에 존재하는지 확인
        const emailExists = await this.authRepository.existsBy({ email });

        // 요청한 이메일이 이미 존재할 경우에만 이 유저의 상태 확인
        if (emailExists) {
            throw new UnauthorizedException("이미 등록된 이메일입니다.");
        }

        // 닉네임 중복 확인
        const nickNameExists = await this.getNickNameExistence(nickName);
        if (nickNameExists) {
            throw new UnauthorizedException("이미 등록된 닉네임입니다.");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.authRepository.create({
            email,
            password: hashedPassword,
            nickName
        });

        await this.authRepository.save(user);

        // 회원가입 성공 시 JWT토큰 생성 (Payload + Secret)
        const payload = { email };
        const accessToken = this.jwtService.sign(payload);

        // 생성된 토큰으로 이메일 인증링크 보내기
        this.sendVerificationEmail(accessToken);

        return { accessToken };
    }

    // 이것도 수정하기
    async updateUser(id: number, email: string, password: string, nickName: string): Promise<UpdateResult> {
        const updateResult = await this.authRepository.update(
            id,
            {
                email: email,
                password: password,
                nickName: nickName
            }
        );

        return updateResult;
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        const deleteResult = await this.authRepository.delete(id);
        return deleteResult;
    }
}
