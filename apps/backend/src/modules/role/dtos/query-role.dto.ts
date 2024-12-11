import { Allow } from 'class-validator';

export class QueryRoleDto {
  @Allow()
  pageSize?: number;

  @Allow()
  pageNo?: number;

  @Allow()
  name?: string;

  @Allow()
  enable?: boolean;
}
