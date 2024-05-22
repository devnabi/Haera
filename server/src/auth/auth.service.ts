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
        const emailCheckResult = await this.authRepository.exists({
            where: {
                email: email
            }
        });

        return emailCheckResult;
    }

    async getNickNameExistence(nickName: string): Promise<Boolean> {
        const nickNameCheckResult = await this.authRepository.exists({
            where: {
                nickname: nickName
            }
        });

        return nickNameCheckResult;
    }

    async sendVerificationEmail(email: string) {
        // 이메일 존재 여부 확인 후 이메일 보내기
        const emailExists = await this.getEmailExistence(email);

        if (!emailExists) {
            // 이메일이 유효한지 인증을 위한 토큰 생성
            const payload = { email };
            const emailVerificationToken = this.jwtService.sign(payload);

            // 이메일 인증 링크
            const emailverificationLink = `${process.env.HAERA_URL}/verifyEmail?token=${emailVerificationToken}`;

            const mailOptions = {
                from: process.env.SMTP_USER,
                to: email,
                Subject: "Welcome to Haera! Verify Your Email Address",
                html: `<h1>Email Verification</h1>
            <p>링크를 누르면 이메일이 인증됩니다.</p>
            <a href= "${emailverificationLink}">Verify Email</a>`
            }

            return await this.transporter.sendMail(mailOptions);
        }
    }

    async updateEmailVerificationStatus(email: string): Promise<UpdateResult> {
        // 인증이 되었다면 DB에 이메일 상태 Update
        const updateResult = await this.authRepository.update(
            email,
            {
                isEmailVerified: true
            }
        );

        return updateResult;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.authRepository.findOneBy({ id });
        return user;
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        // 이메일 검증, 닉네임 중복 확인이 다 되었음을 확인해야 함
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
        const { email, password, nickname } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.authRepository.create({
            email,
            password: hashedPassword,
            nickname,
        });

        await this.authRepository.save(user);

        // 회원가입 성공 시 JWT토큰 생성 (Payload + Secret)
        const payload = { email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }

    async updateUser(id: number, email: string, password: string, nickname: string): Promise<UpdateResult> {
        const updateResult = await this.authRepository.update(
            id,
            {
                email: email,
                password: password,
                nickname: nickname
            }
        );

        return updateResult;
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        const deleteResult = await this.authRepository.delete(id);
        return deleteResult;
    }
}
