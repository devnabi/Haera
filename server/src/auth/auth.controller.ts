import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UpdateResult } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    getAllUser(): Promise<User[]> {
        return this.authService.getAllUser();
    }

    @Get('/emailExists')
    async getEmailExistence(
        @Query('email') email: string
    ): Promise<Boolean> {
        const emailExists = await this.authService.getEmailExistence(email);
        return emailExists;
    }

    @Get('/nickNameExists')
    async getNickNameExistence(
        @Query('nickName') nickName: string
    ): Promise<Boolean> {
        const nickNameExists = await this.authService.getNickNameExistence(nickName);
        return nickNameExists
    }

    @Get('/find/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        const user = await this.authService.getUserById(id);
        if (!user) {
            throw new HttpException(`'${id}' 유저를 찾을 수 없습니다.`, HttpStatus.NOT_FOUND)
        }
        return user;
    }

    @Post('/sendVerificationEmail/:token')
    async sendVerificationEmail(
        @Param('token') token: string
    ): Promise<void> {
        return await this.authService.sendVerificationEmail(token);
    }

    @Post('/sendPasswordResetEmail')
    sendPasswordResetEmail(
        @Body('email') email: string
    ): Promise<void> {
        return this.authService.sendPasswordResetEmail(email);
    }

    @Post('/generateAndSaveHashedPassword')
    generateAndSaveHashedPassword(
        @Query('email') email: string
    ): Promise<UpdateResult> {
        return this.authService.generateAndSaveHashedPassword(email);
    }

    @Post('/validatePassword')
    async validatePassword(@Body() authCredentialsDto: AuthCredentialsDto): Promise<Boolean> {
        const isPasswordValid = await this.authService.validatePassword(authCredentialsDto);
        if (!isPasswordValid) {
            throw new HttpException("비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }
        return isPasswordValid;
    }

    @Post('/verifyTokenAndUpdateEmailVerificationStatus')
    async verifyTokenAndUpdateEmailVerificationStatus(
        @Query('token') token: string
    ): Promise<UpdateResult> {
        const email = this.authService.verifyTokenAndSaveEmail(token);
        const updateResult = await this.authService.updateEmailVerificationStatus(email);
        return updateResult;
    }

    @Get('/getValidateUser/:accessToken')
    getValidateUser(
        @Param('accessToken') accessToken: string
    ): Promise<User> {
        return this.authService.getValidateUser(accessToken);
    }

    @Post('/signIn')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken?: string }> {
        const { email } = authCredentialsDto;
        const emailExists = await this.authService.getEmailExistence(email);
        if (!emailExists) {
            throw new HttpException(`${email}: 등록되지 않은 유저입니다.`, HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await this.authService.validatePassword(authCredentialsDto);
        if (!isPasswordValid) {
            throw new HttpException("비밀번호가 일치하지 않습니다.", HttpStatus.UNAUTHORIZED);
        }
        const { accessToken } = await this.authService.signIn(authCredentialsDto);
        return { accessToken };
    }

    @Post('/signUp')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { email, nickName } = authCredentialsDto;
        const emailExists = await this.authService.getEmailExistence(email);
        if (emailExists) {
            throw new HttpException(`${email}: 이미 등록된 이메일입니다.`, HttpStatus.CONFLICT);
        }
        const nickNameExists = await this.authService.getNickNameExistence(nickName);
        if (nickNameExists) {
            throw new HttpException(`${nickName}: 이미 등록된 닉네임입니다.`, HttpStatus.CONFLICT);
        }
        const accessToken = this.authService.signUp(authCredentialsDto);
        return accessToken;
    }

    @Patch('/update/:id')
    async updateUser(
        @Param('id') id: number,
        @Body() authCredentialsDto: AuthCredentialsDto,
        @Body('newPassword') newPassword: string
    ) {
        return await this.authService.updateUser(id, authCredentialsDto, newPassword);
    }

    @Patch('/deactivateUserAccount/:id')
    async deactivateUserAccount(
        @Param('id') id: number,
        @Body('password') password: string
    ): Promise<UpdateResult> {
        return await this.authService.deactivateUserAccount(id, password);
    }
}
