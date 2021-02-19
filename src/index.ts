import { Slot, WebCtx } from 'qoq';
import ratelimit from 'koa-ratelimit';
import { Redis as IORedis } from 'ioredis';

interface RedisDriver {
  driver: 'redis';
  db: IORedis;
}

interface MemoryDriver {
  driver: 'memory',
  db?: Map<any, any>;
}

interface BaseRateLimitOptions {
  /**
   * The length of a single limiting period. This value is expressed
   * in milliseconds, defaulting to one hour.
   */
  duration?: number;

  /**
   * The maximum amount of requests a client (see the `id` field) may
   * make during a limiting period. (see `duration`)
   */
  max?: number;

  /**
   * Get the unique-identifier for a request. This defaults to the
   * client's IP address. Returning "false" will skip rate-limiting.
   */
  id?: (ctx: WebCtx) => string | false;

  /**
   * Whether or not to disable the usage of rate limit headers. This defaults
   * to **false**.
   */
  disableHeader?: boolean;

  /**
   * The message used on the response body if a client is rate-limited. There is
   * a default message; which includes when they should try again.
   */
  errorMessage?: string;

  /**
   * Whether or not to throw an error upon being rate-limited. This uses
   * the Koa context function "throw".
   */
  throw?: boolean;

  /**
   * A relation of header to the header's display name.
   */
  headers?: {
    /**
     * The amount of requests remaining in the current limiting period.
     */
    remaining: string;

    /**
     * The time, expressed as a UNIX epoch timestamp, at which your rate-limit expires.
     */
    reset: string;

    /**
     * The total amount of requests a client may make during a limiting period.
     */
    total: string;
  };

  /**
   * If function returns true, middleware exits before limiting
   */
  whitelist?: (ctx: WebCtx) => boolean | Promise<boolean>;

  /**
   * If function returns true, 403 error is thrown
   */
  blacklist?: (ctx: WebCtx) => boolean | Promise<boolean>;
}

export type RateLimitOptions = (RedisDriver | MemoryDriver) & BaseRateLimitOptions;

export class RateLimit extends Slot<Slot.Web> {
  constructor(options: RateLimitOptions) {
    super();
    // @ts-ignore
    this.use(ratelimit(options));
  }
}
