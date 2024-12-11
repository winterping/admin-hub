import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '@/modules/role/entities/role.entity';
import { MethodType, PermissionType } from '@/types';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '名称' })
  name: string;

  @Column({ unique: true, length: 50, comment: '编码' })
  code: string;

  @Column({ comment: '类型' })
  type: PermissionType;

  @ManyToOne(() => Permission, (permission) => permission.children, {
    createForeignKeyConstraints: false,
  })
  parent: Permission;

  @OneToMany(() => Permission, (permission) => permission.parent, {
    createForeignKeyConstraints: false,
  })
  children: Permission[];

  @Column({ nullable: true })
  parentId: number;

  @Column({ nullable: true, comment: '路由地址' })
  path: string;

  @Column({ nullable: true, comment: '重定向地址' })
  redirect: string;

  @Column({ nullable: true, comment: '菜单图标' })
  icon: string;

  @Column({ nullable: true, comment: '路由组件' })
  component: string;

  @Column({ nullable: true })
  keepAlive: boolean;

  @Column({ nullable: true })
  method: MethodType;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true, comment: '是否展示在页面菜单' })
  show: boolean;

  @Column({ default: true })
  enable: boolean;

  @Column({ nullable: true })
  order: number;

  @ManyToMany(() => Role, (role) => role.permissions, {
    createForeignKeyConstraints: false,
  })
  roles: Role[];
}
