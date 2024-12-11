import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  // constructor() {
  //   super();
  // }
  handleRequest(err, user, info, context: ExecutionContext) {
    if (info && info.message === 'No auth token') {
      // 如果没有 Token，则抛出自定义错误信息
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'token检验失败，请检查是否带上',
          error: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return super.handleRequest(err, user, info, context);
  }
}
