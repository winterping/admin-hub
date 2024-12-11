import { Injectable } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { compareSync } from 'bcryptjs';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';

import { UserState } from '@/types';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/shared/redis.service';
import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  USER_ACCESS_TOKEN_KEY,
} from '@/constants/redis.contant';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  //校验当前用户是否存在
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //登录
  login(user: UserState) {
    // console.log('user', user);
    if (!user.roles?.some((item) => item.enable)) {
      throw new CustomException(ErrorCode.ERR_11003);
    }
    const roles = user.roles.map((item) => item.code);
    const payload = {
      userId: user.id,
      username: user.username,
      roles,
      currentRole: user.roles[0],
    };
    const accessToken = this.generateToken(payload);
    // console.log('payload', payload);
    return {
      ...payload,
      accessToken,
    };
  }

  //   生成token，保存在redis中
  generateToken(payload: any) {
    const accessToken = this.jwtService.sign(payload);
    this.redisService.set(
      this.getAccessTokenKey(payload),
      accessToken,
      ACCESS_TOKEN_EXPIRATION_TIME,
    );
    return accessToken;
  }

  getAccessTokenKey(payload: any) {
    return `${USER_ACCESS_TOKEN_KEY}:${payload.userId}`;
  }

  // 退出登录
  async logout(user: any) {
    if (user.userId) {
      await Promise.all([this.redisService.del(this.getAccessTokenKey(user))]);
      return true;
    }
    return false;
  }
}
