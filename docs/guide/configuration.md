# Configuration

The `CoolifyClient` accepts a configuration object with the following options.

## Basic Configuration

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-api-token',
});
```

## Configuration Options

### `baseUrl` (required)

The base URL of your Coolify API instance. Must include the `/api/v1` path.

```typescript
baseUrl: 'https://coolify.example.com/api/v1'
```

**Note**: Always include `/api/v1` at the end of your base URL.

### `token` (required)

Your Coolify API token. You can create one in **Settings** > **API Tokens** in your Coolify instance.

```typescript
token: 'your-api-token-here'
```

### `timeout` (optional)

Request timeout in milliseconds. Defaults to `30000` (30 seconds).

```typescript
timeout: 60000 // 60 seconds
```

## Environment Variables

For better security, store your configuration in environment variables:

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: process.env.COOLIFY_BASE_URL!,
  token: process.env.COOLIFY_API_TOKEN!,
  timeout: parseInt(process.env.COOLIFY_TIMEOUT || '30000'),
});
```

Create a `.env` file:

```env
COOLIFY_BASE_URL=https://coolify.example.com/api/v1
COOLIFY_API_TOKEN=your-api-token-here
COOLIFY_TIMEOUT=30000
```

## Multiple Instances

You can create multiple client instances for different Coolify instances:

```typescript
const production = new CoolifyClient({
  baseUrl: 'https://coolify-prod.example.com/api/v1',
  token: process.env.PROD_TOKEN!,
});

const staging = new CoolifyClient({
  baseUrl: 'https://coolify-staging.example.com/api/v1',
  token: process.env.STAGING_TOKEN!,
});
```

## TypeScript Types

The configuration type is exported:

```typescript
import type { CoolifyClientConfig } from '@neelansh/coolifyjs';

const config: CoolifyClientConfig = {
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-token',
  timeout: 60000,
};

const coolify = new CoolifyClient(config);
```

## Best Practices

1. **Never commit tokens**: Use environment variables or secret management
2. **Use appropriate timeouts**: Increase timeout for slow networks or large operations
3. **Validate configuration**: Ensure `baseUrl` ends with `/api/v1`
4. **Handle errors**: Wrap client creation in try-catch for invalid configuration

## Next Steps

- Learn about [Error Handling](/guide/error-handling)
- Explore the [API Reference](/api/)
