import { SharedService } from '@/shared/shared.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';

@Injectable()
export class PermissionService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
  ) {}

  //通过code查询菜单
  findByCode(code: string) {
    return this.permissionRepo.findOne({
      where: { code },
      select: ['id', 'name'],
    });
  }

  //创建菜单
  async create(createPermissionDto: CreatePermissionDto) {
    const existMenu = await this.findByCode(createPermissionDto.code);
    if (existMenu) {
      throw new CustomException(ErrorCode.ERR_12001);
    }
    const createPermission = this.permissionRepo.create(createPermissionDto);
    // console.log('createPermission', createPermission);
    return this.permissionRepo.save(createPermission);
  }

  //获取所有权限菜单
  async findAllTree() {
    const permissions = await this.permissionRepo.find({
      order: { order: 'ASC' },
    });
    const treeData = this.sharedService.handleTree(permissions);
    console.log('permissions', treeData);
    return this.sharedService.handleTree(permissions);
  }
}
