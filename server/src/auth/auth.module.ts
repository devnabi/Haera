import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret:'secret',
      signOptions: {
        expiresIn: 60 * 60
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  // JwtStrategy를 Auth모듈에서 사용할 수 있도록 등록
  providers: [AuthService, JwtStrategy],
  // JwtStrategy, Passport모듈을 다른 모듈에서 사용할 수 있도록 등록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
