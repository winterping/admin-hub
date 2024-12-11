// global.d.ts
import { Session } from 'express-session'; // 或根据你使用的 session 类型调整
import { UserState } from './types';

declare global {
  namespace Express {
    interface Request {
      session: Session; // 将 session 添加到 Request 类型
      user: UserState;
    }
  }
}
