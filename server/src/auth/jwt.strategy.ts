import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>
    ) {
        super({
            // 가져온 Token이 유효한지 체크
            secretOrKey: "secret",
            //AuthHeader로 부터 온 BearerToken을 가져옴
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        })
    }

    // 토큰이 유효한지 확인이 됐다면 유저 정보가 있는지 확인
    async validate(payload) {
        const { email } = payload;
        const user: User = await this.authRepository.findOneBy({ email });
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
