import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const currentRole = user.currentRole;

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log('roles', roles);

    // 当前用户没有角色
    if (!currentRole) throw new CustomException(ErrorCode.ERR_11005);
    if (!roles?.length) return true;

    // 当前角色不在可操作角色范围内
    if (!roles.includes(currentRole.code))
      throw new CustomException(ErrorCode.ERR_11003);
    return true;
  }
}
