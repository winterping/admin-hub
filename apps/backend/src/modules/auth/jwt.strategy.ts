import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';
import { ACCESS_TOKEN_EXPIRATION_TIME } from '@/constants/redis.contant';
import { RedisService } from '@/shared/redis.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private userService: UserService,
    private authService: AuthService,
    private redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.userService.findByUsername(payload.username);
    // console.log('jwt-user', user);
    // console.log('jwt-user', payload);

    if (!user.enable) {
      throw new CustomException(ErrorCode.ERR_11007);
    }
    const currentRole = user.roles.find(
      (item) => item.code === payload.currentRole.code,
    );
    // console.log('currentRole', currentRole);

    if (!currentRole.enable) {
      throw new CustomException(ErrorCode.ERR_11008);
    }

    // 从请求头中提取JWT
    const reqToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // 从Redis中获取用户访问令牌
    const accessToken = await this.redisService.get(
      this.authService.getAccessTokenKey(payload),
    );

    // 如果请求令牌不等于访问令牌
    if (reqToken !== accessToken) {
      this.redisService.del(this.authService.getAccessTokenKey(payload));
      throw new CustomException(ErrorCode.ERR_11002);
    }

    // 延长token过期时间
    this.redisService.set(
      this.authService.getAccessTokenKey(payload),
      accessToken,
      ACCESS_TOKEN_EXPIRATION_TIME,
    );

    return {
      userId: payload.userId,
      username: payload.username,
      roles: payload.roles || [],
      currentRole: payload.currentRole,
    };
  }
}
