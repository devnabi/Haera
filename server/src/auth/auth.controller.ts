import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, ValidationPipe, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get()
    getAllUser(): Promise<User[]> {
        return this.authService.getAllUser();
    }

    @Get('/checkEmail')
    async getEmailExistence(
        @Query('email') email: string
    ): Promise<Boolean> {
        const emailCheckResult = await this.authService.getEmailExistence(email);
        return emailCheckResult;
    }

    @Get('/checkNickName')
    async getNickNameExistence(
        @Query('nickName') nickName: string
    ): Promise<Boolean> {
        const nickNameCheckResult = await this.authService.getNickNameExistence(nickName);
        return nickNameCheckResult
    }

    @Post('/sendVerificationEmail/:token')
    async sendVerificationEmail(
        @Param('token') token: string
    ) {
        return await this.authService.sendVerificationEmail(token);
    }

    @Post('/verifyTokenAndUpdateEmailVerificationStatus')
    async verifyTokenAndUpdateEmailVerificationStatus(
        @Query('token') token: string
    ) {
        const email = await this.authService.verifyTokenAndSaveEmail(token);
        const updateResult = await this.authService.updateEmailVerificationStatus(email);
        return updateResult;
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
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const accessToken = this.authService.signIn(authCredentialsDto);
        return accessToken;
    }

    @Post('/signUp')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const accessToken = this.authService.signUp(authCredentialsDto);
        return accessToken;
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
