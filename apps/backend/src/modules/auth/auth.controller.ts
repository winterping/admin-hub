import {
  Controller,
  Get,
  Req,
  Res,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as svgCaptcha from 'svg-captcha';
import { LocalGuard } from '@/common/guards/local.guard';
import { Request, Response } from 'express';
import { JwtGuard } from '@/common/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //生成验证码
  @Get('captca')
  createCaptca(@Req() req: Request, @Res() res: Response) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 40,
      width: 80,
      height: 40,
      background: '#fff',
      color: true,
    });
    // console.log('captcha', captcha);
    req.session.code = captcha.text || '';
    res.type('image/svg+xml');
    res.status(200).send(captcha.data);
  }

  //登录
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  // 退出登录
  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@Req() req: Request) {
    return this.authService.logout(req.user);
  }
}
