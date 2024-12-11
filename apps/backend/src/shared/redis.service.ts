import { Inject, Injectable } from '@nestjs/common';
import Redis, { Redis as RedisClientType } from 'ioredis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  constructor() {
    // Redis 客户端实例化
    this.redisClient = new Redis({
      host: 'localhost', // Redis 服务器地址，默认是 localhost
      port: 6379, // Redis 服务器端口，默认是 6379
    });
  }

  // 获取 Redis 键值
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  // 设置 Redis 键值，支持设置过期时间（TTL）
  async set(key: string, value: string | number, ttl?: number): Promise<'OK'> {
    const result = await this.redisClient.set(key, value);

    if (ttl) {
      await this.redisClient.expire(key, ttl); // 设置 TTL
    }

    return result;
  }

  // 删除指定的 Redis 键
  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }

  // 获取 Redis 哈希表中的所有字段和值
  async hashGet(key: string): Promise<Record<string, string>> {
    return await this.redisClient.hgetall(key);
  }

  // 设置 Redis 哈希表中的多个字段和值，支持设置过期时间（TTL）
  async hashSet(
    key: string,
    obj: Record<string, any>,
    ttl?: number,
  ): Promise<'OK'> {
    const result = await this.redisClient.hmset(key, obj);

    if (ttl) {
      await this.redisClient.expire(key, ttl); // 设置 TTL
    }

    return result;
  }
}
