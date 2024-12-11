import { Exclude } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  //   @Exclude()
  @IsOptional()
  code?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsArray()
  permissionIds?: number[];

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}
