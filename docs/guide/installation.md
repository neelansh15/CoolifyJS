# Installation

Install CoolifyJS using npm, yarn, or pnpm.

## npm

```bash
npm install @neelansh/coolifyjs
```

## yarn

```bash
yarn add @neelansh/coolifyjs
```

## pnpm

```bash
pnpm add @neelansh/coolifyjs
```

## Import Patterns

### ESM (Recommended)

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';
```

### CommonJS

```javascript
const { CoolifyClient } = require('@neelansh/coolifyjs');
```

### TypeScript Types

All types are exported from the package:

```typescript
import type {
  Application,
  Database,
  Server,
  Project,
  CoolifyClientConfig,
} from '@neelansh/coolifyjs';
```

### Named Exports

You can import specific resources or error classes:

```typescript
import {
  CoolifyClient,
  CoolifyError,
  CoolifyNotFoundError,
  ApplicationsResource,
} from '@neelansh/coolifyjs';
```

## Requirements

- **Node.js**: 18.0.0 or higher
- **TypeScript**: 4.5 or higher (optional, but recommended)

## Package Size

CoolifyJS is lightweight with zero runtime dependencies:
- **Minified**: ~15KB
- **Gzipped**: ~5KB

## TypeScript Support

CoolifyJS is written in TypeScript and includes comprehensive type definitions. No additional `@types` package is needed.

## Browser Support

CoolifyJS uses the native `fetch` API, which is available in:
- Node.js 18+ (native)
- Modern browsers (Chrome 42+, Firefox 39+, Safari 10.1+, Edge 14+)
- For older environments, consider using a `fetch` polyfill

## Next Steps

- Read the [Getting Started](/guide/getting-started) guide
- Learn about [Configuration](/guide/configuration) options
