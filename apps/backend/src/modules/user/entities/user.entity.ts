import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from '@/modules/role/entities/role.entity';
// import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  enable: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  // @OneToOne(() => Profile, (profile) => profile.user, {
  //   createForeignKeyConstraints: false,
  //   cascade: true,
  // })
  // profile: Profile;

  @ManyToMany(() => Role, (role) => role.users, {
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  roles: Role[];
}
