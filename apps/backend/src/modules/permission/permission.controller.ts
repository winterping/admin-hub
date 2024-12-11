import { Controller, UseGuards, Post, Body, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { CreatePermissionDto } from './dtos/create-permission.dto';

@Controller('permission')
@UseGuards(JwtGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // 创建菜单
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  // 获取所有权限菜单
  @Get('tree')
  findAllTree() {
    return this.permissionService.findAllTree();
  }
}
