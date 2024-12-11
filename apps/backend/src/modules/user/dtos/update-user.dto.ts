import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @Exclude()
  password: string;

  // @Exclude()
  // profile?: Profile;

  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsOptional()
  username?: string;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;

  @IsOptional()
  @IsArray()
  roleIds?: number[];
}
