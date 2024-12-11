import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryUserDto } from './dtos/query-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
@UseGuards(JwtGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 新增用户---只允许超级管理员新增
  @Post('create')
  // @Roles('super_admin')
  addUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  // 获取用户带查询
  @Post('page')
  getUsers(@Body() queryDto: QueryUserDto) {
    return this.userService.findUsers(queryDto);
  }

  // 获取用户带查询
  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
