import { SharedService } from '@/shared/shared.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '@/modules/permission/entities/permission.entity';
import { User } from '@/modules/user/entities/user.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { QueryRoleDto } from './dtos/query-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { log } from 'console';

@Injectable()
export class RoleService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  //   创建角色
  async create(createRoleDto: CreateRoleDto) {
    const existRole = await this.roleRepo.findOne({
      where: [{ name: createRoleDto.name }, { code: createRoleDto.code }],
    });
    if (existRole) {
      throw new BadRequestException('角色已存在（角色名和角色编码不能重复）');
    }

    const role = this.roleRepo.create(createRoleDto);
    // if (createRoleDto.permissionIds) {
    //   role.permissions = await this.permissionRepo.find({
    //     where: { id: In(createRoleDto.permissionIds) },
    //   });
    // }
    return this.roleRepo.save(role);
  }

  //获取角色列表带查询
  async findRoles(query: QueryRoleDto) {
    const pageSize = query.pageSize || 10;
    const pageNo = query.pageNo || 1;
    const [list, total] = await this.roleRepo.findAndCount({
      where: {
        name: Like(`%${query.name || ''}%`),
        enable: query.enable,
      },
      // relations: { permissions: true },
      order: {
        createTime: 'DESC',
      },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
    });
    // console.log('findRoles', list);
    return { list, total };
  }

  //更新某个角色
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    // console.log('updateRoleDto', updateRoleDto);

    const role = await this.findOne(id);
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    if (role.code === 'SUPER_ADMIN')
      throw new BadRequestException('不允许修改超级管理员');
    const newRole = this.roleRepo.merge(role, updateRoleDto);
    // if (updateRoleDto.permissionIds) {
    //   newRole.permissions = await this.permissionRepo.find({
    //     where: { id: In(updateRoleDto.permissionIds) },
    //   });
    // }
    console.log('newRole', newRole);

    await this.roleRepo.save(newRole);
    return true;
  }

  //删除某个角色
  async remove(id: number) {
    const role = await this.roleRepo.findOne({
      where: { id },
      // relations: { users: true },
    });
    if (!role) throw new BadRequestException('角色不存在或者已删除');
    if (role.code === 'SUPER_ADMIN')
      throw new BadRequestException('不允许删除超级管理员');
    await this.roleRepo.remove(role);
    return true;
  }

  findOne(id: number) {
    return this.roleRepo.findOne({ where: { id } });
  }

  async findAll() {
    return this.roleRepo.find({ where: { enable: true } });
  }
}
