## 简介

admin-hub是一个基于vite和vue3实现的通用后台管理项目模板，封装了最核心的路由权限控制，在此基础上可以自行开发自己的业务。后端采用nest实现了RBAC权限控制。供大家学习参考。

## 安装使用
采用monorepo的方式进行项目管理，前端代码在web-vue目录下，后端代码在backend目录下。

- 安装依赖

```bash
cd admin-hub
pnpm install
```

- 前端运行

```bash
pnpm run dev:web-vue
```

- 后端运行

```bash
pnpm run dev:backend
```

## 注意事项
后端数据库使用了mysql和redis，需要自行修改相关数据库的连接信息。相关sql文件在backend/sql目录下。