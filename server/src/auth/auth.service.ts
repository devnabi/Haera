import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, LessThan, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as generator from 'generate-password';
import { Cron, CronExpression } from '@nestjs/schedule';

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
        const emailCheckResult = await this.authRepository.existsBy({ email });

        return emailCheckResult;
    }

    async getNickNameExistence(nickName: string): Promise<Boolean> {
        const nickNameCheckResult = await this.authRepository.existsBy({ nickName });

        return nickNameCheckResult;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.authRepository.findOneBy({ id });
        return user;
    }

    async sendVerificationEmail(token: string): Promise<void> {
        // 가입 성공 시 생성된 토큰에서 페이로드 추출
        const payload = this.jwtService.verify(token);

        // 이메일 인증 링크
        const emailverificationLink = `${process.env.HAERA_URL}/emailverificationsuccess?token=${token}`;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: payload.email,
            subject: "Welcome to Haera! Verify Your Email Address",
            html: `<h1>Email Verification</h1>
            <p>링크를 누르면 이메일이 인증됩니다.</p>
            <a href= "${emailverificationLink}">Verify Email</a>`
        }

        return await this.transporter.sendMail(mailOptions);
    }

    async sendPasswordResetEmail(email: string): Promise<void> {
        const emailExists = await this.getEmailExistence(email);
        const passwordResetUrl = `${process.env.HAERA_URL}/temporarypasswordcreated?email=${email}`;

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Password Reset Request",
            html: `<h1>임시 비밀번호 생성 & 초기화</h1>
            <p>링크를 클릭 시, 임시 비밀번호가 이메일로 보내집니다.</p>
            <a href= "${passwordResetUrl}">임시 비밀번호 생성하기</a>`
        }

        await this.transporter.sendMail(mailOptions);
    }

    async generateAndSaveHashedPassword(email: string): Promise<UpdateResult> {
        const temporaryPassword = generator.generate({
            length: 8,
            numbers: true,
            symbols: true
        });

        // 생성된 임시 비밀번호 전송
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Your Temporary Password",
            html: `<h1>임시 비밀번호가 생성되었습니다.</h1>
            <p>다음 임시 비밀번호로 로그인 하시고 비밀번호를 변경하세요: </p>
            <p><strong>${temporaryPassword}</strong></p>`
        }
        await this.transporter.sendMail(mailOptions);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(temporaryPassword, salt);

        // Update DB
        const updateResult = await this.authRepository.update(
            { email },
            {
                password: hashedPassword
            });

        return updateResult;
    }

    // 토큰이 일치하는지 확인
    verifyTokenAndSaveEmail(token: string): string {
        const payload = this.jwtService.verify(token);
        const email = payload.email;

        return email;
    }

    // Token으로 인증된 이메일의 상태를 업데이트
    async updateEmailVerificationStatus(email: string): Promise<UpdateResult> {
        const updateResult = await this.authRepository.update(
            { email },
            { isEmailVerified: true }
        );

        return updateResult;
    }

    // accessToken을 검증하여 사용자 정보를 가져오는 메서드
    async getValidateUser(accessToken: string): Promise<User> {
        const payload = this.jwtService.verify(accessToken);
        const { email } = payload;
        const user = await this.authRepository.findOneBy({ email });

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

        // 로그인 성공 시 deactivated_at을 null로 초기화
        await this.authRepository.update(
            user.id,
            {
                deactivated_at: null
            });

        return { accessToken };
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { email, password, nickName } = authCredentialsDto;
        const emailExists = await this.getEmailExistence(email);
        if (emailExists) {
            throw new UnauthorizedException("이미 등록된 이메일입니다.");
        }

        const nickNameExists = await this.getNickNameExistence(nickName);
        if (nickNameExists) {
            throw new UnauthorizedException("이미 등록된 닉네임입니다.");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdAt = new Date();
        const user = this.authRepository.create({
            email,
            password: hashedPassword,
            nickName,
            created_at: createdAt
        });

        await this.authRepository.save(user);

        // 회원가입 성공 시 JWT토큰 생성 (Payload + Secret)
        const payload = { email };
        const accessToken = this.jwtService.sign(payload);

        // 생성된 토큰으로 이메일 인증링크 보내기
        this.sendVerificationEmail(accessToken);

        return { accessToken };
    }

    async updateUser(id: number, authCredentialsDto: AuthCredentialsDto, newPassword: string): Promise<void> {
        const { password, nickName } = authCredentialsDto;
        // 사용자 데이터를 가져와서 비교
        const user = await this.authRepository.findOneBy({ id });

        // 사용자가 입력한 password가 DB에 담긴 password와 일치하는지 확인
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("기존 비밀번호가 틀립니다.");
        }

        // 새로운 비번이 있다면 해싱하여 저장
        if (newPassword && newPassword.trim().length >= 8) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await this.authRepository.update(id, { password: hashedPassword });
        }

        // 본인의 닉네임을 변경하지 않고 그대로 보낼 경우는 어떻게 처리?
        // -> 비번만 바꾸려고 했는데 이미 등록됐다고 에러를 던지면 닉넴까지 강제로 변경해야 된다는 뜻이 됨...
        if ((nickName) && (nickName !== user.nickName) && (nickName.trim().length > 0)) {
            // 요청한 닉네임 중복 확인
            const nickNameExists = await this.getNickNameExistence(nickName);
            if (nickNameExists) {
                throw new UnauthorizedException("이미 등록된 닉네임입니다.");
            }
            await this.authRepository.update(id, { nickName: nickName });
        }
    }

    async deactivateUserAccount(id: number, password: string): Promise<UpdateResult> {
        const user = await this.authRepository.findOneBy({ id });
        // 사용자가 입력한 password가 DB에 담긴 password와 일치하는지 확인
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("비밀번호가 틀립니다.");
        }
        const deactivateAt = new Date();
        const updateResult = this.authRepository.update(
            id,
            {
                deactivated_at: deactivateAt
            });

        return updateResult;
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
        timeZone: "Asia/Seoul"
    })
    async deleteUnverifiedAccounts(): Promise<void> {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        try {
            const deleteResult = await this.authRepository.delete({
                isEmailVerified: false,
                created_at: LessThan(threeDaysAgo)
            });
            console.log("deleteResult: ", deleteResult.affected);
        } catch (error) {
            console.log("error", error);
        }
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
        timeZone: "Asia/Seoul"
    })
    async deleteAccountIfInactiveAfterSevenDays(): Promise<void> {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        // 로그인할 때 항상 deactivated_at을 null로 초기화
        // -> 7일 이내로 로그인 시 탈퇴 요청이 취소된다.
        try {
            const deleteResult = await this.authRepository.delete({
                deactivated_at: LessThan(sevenDaysAgo)
            });
            console.log("deleteResult: ", deleteResult.affected);
        } catch (error) {
            console.log("error", error);
        }
    }
}
