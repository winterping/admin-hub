import { PermissionType, MethodType } from '@/types';
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  type: PermissionType;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsString()
  @IsOptional()
  path?: string;

  @IsString()
  @IsOptional()
  redirect?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  component?: string;

  @IsBoolean()
  @IsOptional()
  keepAlive?: boolean;

  @IsString()
  @IsOptional()
  method?: MethodType;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  show?: boolean;

  @IsBoolean()
  @IsOptional()
  enable?: boolean;
}
