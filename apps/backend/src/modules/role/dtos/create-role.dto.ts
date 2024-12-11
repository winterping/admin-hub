import { IsNotEmpty, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色编码不能为空' })
  code: string;

  @IsNotEmpty({ message: '角色名不能为空' })
  name: string;

  @IsOptional()
  @IsArray()
  permissionIds: number[];

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}
