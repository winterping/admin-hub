import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import {
  CustomException,
  ErrorCode,
} from '@/common/exceptions/custom.exception';
import { Role } from '@/modules/role/entities/role.entity';
import { hashSync } from 'bcryptjs';
import { QueryUserDto } from './dtos/query-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {}

  //通过用户名查询用户
  findByUsername(username: string) {
    return this.userRep.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'enable'],
      relations: {
        // profile: true,
        roles: true,
      },
    });
  }

  //创建用户
  async create(user: CreateUserDto) {
    const { username } = user;
    const existUser = await this.findByUsername(username);

    if (existUser) {
      throw new CustomException(ErrorCode.ERR_10001);
    }
    console.log('user', user);

    const newUser = this.userRep.create(user);
    if (user.roleIds !== undefined) {
      const roles = await this.roleRepo.find({
        where: { id: In(user.roleIds) },
      });
      // console.log('roles', roles);

      newUser.roles = roles;
    }

    // if (!newUser.profile) {
    //   newUser.profile = this.profileRep.create();
    // }
    newUser.password = hashSync(newUser.password);
    console.log('newUser', newUser);
    await this.userRep.save(newUser);
    return {};
  }

  // 获取所有用户带查询
  async findUsers(query: QueryUserDto) {
    const pageSize = query.pageSize || 10;
    const pageNo = query.pageNo || 1;
    const [users, total] = await this.userRep.findAndCount({
      select: {
        roles: true,
      },
      relations: {
        // profile: true,
        roles: true,
      },
      where: {
        username: Like(`%${query.username || ''}%`),
        enable: query.enable,
        // profile: {
        //   gender: query.gender || undefined,
        // },
      },
      order: {
        createTime: 'DESC',
      },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
    });
    return { list: users, total };
  }

  findUserById(id: number) {
    return this.userRep.findOne({
      where: { id },
      relations: {
        // profile: true,
        roles: true,
      },
    });
  }

  //修改用户
  async updateUser(id: number, user: UpdateUserDto) {
    const findUser = await this.findUserById(id);
    if (user.roleIds !== undefined) {
      findUser.roles = await this.roleRepo.find({
        where: { id: In(user.roleIds) },
      });
    }
    const newUser = this.userRep.merge(findUser, user);
    await this.userRep.save(newUser);
    return true;
  }

  // 删除用户
  async remove(id: number) {
    // 不能删除根用户
    if (id === 1)
      throw new CustomException(ErrorCode.ERR_11006, '不能删除根用户');
    await this.userRep.delete(id);
    return true;
  }
}
