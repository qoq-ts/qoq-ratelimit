# qoq-ratelimit

Rate limiter middleware for qoq based on [koa-ratelimit](https://github.com/koajs/ratelimit).

[![License](https://img.shields.io/github/license/qoq-ts/qoq-ratelimit)](https://github.com/qoq-ts/qoq-ratelimit/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/qoq-ratelimit)](https://www.npmjs.com/package/qoq-ratelimit)

# Installation

```bash
yarn add qoq-ratelimit
```

# Usage

### With a memory driver

```typescript
import { WebSlotManager, createConfig } from 'qoq';
import { RateLimit, RateLimitOptions } from 'qoq-ratelimit';

const options = createConfig<RateLimitOptions>({
  driver: 'memory',
});

export const webSlots = WebSlotManager.use(new RateLimit(options));
```

### With a redis driver

```typescript
import { WebSlotManager, createConfig } from 'qoq';
import { RateLimit, RateLimitOptions } from 'qoq-ratelimit';
import Redis from 'ioredis';

const options = createConfig<RateLimitOptions>({
  driver: 'redis',
  db: new Redis(),
});

export const webSlots = WebSlotManager.use(new RateLimit(options));
```

# Options

@see [koa-ratelimit](https://github.com/koajs/ratelimit#koa-ratelimit)
