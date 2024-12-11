/*
 Navicat Premium Data Transfer

 Source Server         : zyp
 Source Server Type    : MySQL
 Source Server Version : 80027 (8.0.27)
 Source Host           : localhost:3306
 Source Schema         : admin-hub

 Target Server Type    : MySQL
 Target Server Version : 80027 (8.0.27)
 File Encoding         : 65001

 Date: 11/12/2024 18:28:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '名称',
  `code` varchar(50) NOT NULL COMMENT '编码',
  `type` varchar(255) NOT NULL COMMENT '类型',
  `parentId` int DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL COMMENT '路由地址',
  `redirect` varchar(255) DEFAULT NULL COMMENT '重定向地址',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `component` varchar(255) DEFAULT NULL COMMENT '路由组件',
  `keepAlive` tinyint DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `show` tinyint NOT NULL DEFAULT '1' COMMENT '是否展示在页面菜单',
  `enable` tinyint NOT NULL DEFAULT '1',
  `order` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_30e166e8c6359970755c5727a2` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of permission
-- ----------------------------
BEGIN;
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (1, '系统管理', 'sys', 'MENU', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (2, '用户管理', 'sys:user', 'MENU', 1, '/sys/user', NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `name` varchar(50) NOT NULL,
  `enable` tinyint NOT NULL DEFAULT '1',
  `code` varchar(50) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ee999bb389d7ac0fd967172c41` (`code`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`name`, `enable`, `code`, `id`, `createTime`) VALUES ('超级管理员', 1, 'super_admin', 1, '2024-12-04 16:42:52.170125');
INSERT INTO `role` (`name`, `enable`, `code`, `id`, `createTime`) VALUES ('普通用户', 1, 'user', 2, '2024-12-04 16:42:52.170125');
INSERT INTO `role` (`name`, `enable`, `code`, `id`, `createTime`) VALUES ('前端组组长', 1, 'admin', 3, '2024-12-04 16:42:52.170125');
COMMIT;

-- ----------------------------
-- Table structure for role_permissions_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions_permission`;
CREATE TABLE `role_permissions_permission` (
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `IDX_b36cb2e04bc353ca4ede00d87b` (`roleId`),
  KEY `IDX_bfbc9e263d4cea6d7a8c9eb3ad` (`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role_permissions_permission
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `enable` tinyint NOT NULL DEFAULT '1',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`username`, `password`, `enable`, `createTime`, `updateTime`, `id`) VALUES ('super', '$2a$10$FsAafxTTVVGXfIkJqvaiV.1vPfq4V9HW298McPldJgO829PR52a56', 1, '2024-11-29 10:08:28.207563', '2024-11-29 12:14:06.757817', 1);
INSERT INTO `user` (`username`, `password`, `enable`, `createTime`, `updateTime`, `id`) VALUES ('张三', '$2a$10$FGVNcPQ2Cw8doIx97vqOr..h/hFVuN8dOCcL5PcjKDJVdqP2HidWy', 1, '2024-11-29 18:21:36.889703', '2024-11-29 18:21:36.889703', 2);
INSERT INTO `user` (`username`, `password`, `enable`, `createTime`, `updateTime`, `id`) VALUES ('admin', '$2a$10$/N.SHhv2/otZDijNPVWr7OQBXSiX/7XbHV7xgzr.Q933vzcuiSbnG', 1, '2024-12-04 15:54:58.489112', '2024-12-04 16:31:16.000000', 3);
COMMIT;

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role` (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `IDX_5f9286e6c25594c6b88c108db7` (`userId`),
  KEY `IDX_4be2f7adf862634f5f803d246b` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
BEGIN;
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (1, 1);
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (1, 2);
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (2, 2);
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (3, 3);
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (4, 2);
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (4, 3);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
