import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private authRepository : Repository<User>,
        private jwtService : JwtService
    ) {}

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

    async getUserById(id: number): Promise<User> {
        const user = await this.authRepository.findOneBy({ id });
        return user;
    }
    
    async getUser(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
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

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { email, password, nickname } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.authRepository.create({
            email,
            password: hashedPassword,
            nickname,
        });
        
        await this.authRepository.save(user);
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
