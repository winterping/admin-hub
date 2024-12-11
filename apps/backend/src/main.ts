import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      name: process.env.SESSION_NAME,
      rolling: true, //表示每次请求都会重置会话的过期时间。
      cookie: { maxAge: null }, //maxAge: null 表示没有设置过期时间，即会话 cookie 会在浏览器关闭时被删除。
      resave: false, //控制是否在每个请求时都强制保存会话。false 表示仅在会话数据发生变化时才保存会话。这个设置通常会提高性能，因为它避免了不必要的会话保存。
      saveUninitialized: true, //表示即使会话数据没有被修改，也会保存未初始化的会话。通常设置为 true，意味着用户访问时会话会被创建，即使没有存储任何数据。
    }),
  );
  await app.listen(process.env.APP_PORT);
}
bootstrap();
