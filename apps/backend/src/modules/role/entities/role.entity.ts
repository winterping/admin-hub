import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { Permission } from '@/modules/permission/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ unique: true, length: 50 })
  name: string;

  @Column({ default: true })
  enable: boolean;

  @CreateDateColumn()
  createTime: Date;

  @ManyToMany(() => User, (user: any) => user.roles, {
    createForeignKeyConstraints: false,
  })
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  permissions: Permission[];
}
