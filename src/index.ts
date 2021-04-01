import { Slot } from 'qoq';
import ratelimit, { MiddlewareOptions } from 'koa-ratelimit';
import { Redis as IORedis } from 'ioredis';

interface RedisDriver {
  driver: 'redis';
  db: IORedis;
}

interface MemoryDriver {
  driver: 'memory',
  db: Map<any, any>;
}

export type RateLimitOptions = (RedisDriver | MemoryDriver) & Omit<MiddlewareOptions, 'db' | 'driver'>;

export class RateLimit extends Slot<Slot.Web> {
  constructor(options: RateLimitOptions) {
    super();
    this.use(ratelimit(options));
  }
}
