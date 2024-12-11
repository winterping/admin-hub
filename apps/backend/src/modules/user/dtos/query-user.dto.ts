import { Allow } from 'class-validator';

export class QueryUserDto {
  @Allow()
  pageSize?: number;

  @Allow()
  pageNo?: number;

  @Allow()
  username?: string;

  @Allow()
  role?: number;

  @Allow()
  enable?: boolean;
}
