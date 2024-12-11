import {
  IsString,
  IsNotEmpty,
  Length,
  IsBoolean,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 100, { message: `密码长度必须在$constraint1到$constraint2之间` })
  password: string;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;

  //   @IsOptional()
  //   profile?: Profile;

  @IsArray()
  @IsNotEmpty({ message: '用户角色不能为空' })
  roleIds?: number[];
}
