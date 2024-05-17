import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Patch, Post, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Get()
    getAllUser(): Promise<User[]> {
        return this.authService.getAllUser();
    }
    
    @Get('/checkEmail')
    async getEmailExistence(
        @Body('email') email: string
    ): Promise<Boolean> {
        const emailCheckResult = await this.authService.getEmailExistence(email);
        if (emailCheckResult) {
            throw new ConflictException(`이미 등록된 이메일입니다.`);
        }
        return emailCheckResult;
    }
    
    @Get('/find/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        const found = await this.authService.getUserById(id);
        if (!found) {
            throw new NotFoundException(`'${id}' 유저를 찾을 수 없습니다.`);
        }
        return found;
    }

    @Post('/signIn')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const accessToken = this.authService.getUserToken(authCredentialsDto);
        return accessToken;
    }

    @Post('/signUp')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const emailCheckResult = await this.authService.getEmailExistence(authCredentialsDto.email);
        if (emailCheckResult) {
            throw new ConflictException(`이미 등록된 이메일입니다.`);
        }
        const user = this.authService.createUser(authCredentialsDto);
        return user;
    }

    @Patch('/:id')
    updateUser(
        @Param('id') id: number,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('nickname') nickname: string
    ): Promise<UpdateResult> {
        return this.authService.updateUser(id, email, password, nickname);
    }

    @Delete('/:id')
    deleteUser(
        @Param('id') id: number
    ): Promise<DeleteResult> {
        return this.authService.deleteUser(id);
    }
}
