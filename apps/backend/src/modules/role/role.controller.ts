import {
  Controller,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  Delete,
  Get
} from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateRoleDto } from './dtos/create-role.dto';
import { QueryRoleDto } from './dtos/query-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller('role')
@UseGuards(JwtGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  //新增角色
  @Post('create')
  // @Roles('super_admin')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  //获取角色列表带查询
  @Post('page')
  findPagination(@Body() queryDto: QueryRoleDto) {
    return this.roleService.findRoles(queryDto);
  }

  //更新某个角色
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  // 删除某个角色
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(+id);
  }

  //查询所有用户
  @Get('all')
  findAll() {
    return this.roleService.findAll();
  }
}
