# Error Handling

CoolifyJS provides custom error classes for different types of API errors, making it easy to handle errors appropriately.

## Error Classes

The SDK exports the following error classes:

- `CoolifyError` - Base error class for all SDK errors
- `CoolifyAuthError` - Authentication failures (401)
- `CoolifyNotFoundError` - Resource not found (404)
- `CoolifyValidationError` - Validation errors (422)
- `CoolifyRateLimitError` - Rate limit exceeded (429)
- `CoolifyServerError` - Server errors (500+)

## Basic Error Handling

```typescript
import {
  CoolifyClient,
  CoolifyError,
  CoolifyNotFoundError,
  CoolifyAuthError,
} from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-token',
});

try {
  const app = await coolify.applications.get('non-existent-uuid');
} catch (error) {
  if (error instanceof CoolifyNotFoundError) {
    console.log('Application not found');
  } else if (error instanceof CoolifyAuthError) {
    console.log('Invalid API token');
  } else if (error instanceof CoolifyError) {
    console.log('API error:', error.message);
    console.log('Status code:', error.statusCode);
  } else {
    console.log('Unexpected error:', error);
  }
}
```

## Handling Specific Errors

### Authentication Errors

```typescript
try {
  await coolify.applications.list();
} catch (error) {
  if (error instanceof CoolifyAuthError) {
    console.error('Authentication failed. Please check your API token.');
    // Handle re-authentication or token refresh
  }
}
```

### Not Found Errors

```typescript
try {
  const app = await coolify.applications.get('uuid');
} catch (error) {
  if (error instanceof CoolifyNotFoundError) {
    console.log(`Resource not found: ${error.message}`);
    // Handle missing resource
  }
}
```

### Validation Errors

```typescript
try {
  await coolify.applications.createFromPublicRepo({
    project_uuid: 'invalid',
    // ... missing required fields
  });
} catch (error) {
  if (error instanceof CoolifyValidationError) {
    console.log('Validation errors:', error.errors);
    // error.errors is a Record<string, string[]>
    // Example: { "project_uuid": ["The project uuid field is required."] }
  }
}
```

### Rate Limit Errors

```typescript
try {
  await coolify.applications.list();
} catch (error) {
  if (error instanceof CoolifyRateLimitError) {
    const retryAfter = error.retryAfter || 60;
    console.log(`Rate limited. Retry after ${retryAfter} seconds`);
    // Implement exponential backoff
  }
}
```

### Server Errors

```typescript
try {
  await coolify.applications.start('uuid');
} catch (error) {
  if (error instanceof CoolifyServerError) {
    console.error('Server error:', error.message);
    console.error('Status code:', error.statusCode);
    // Log error for monitoring, implement retry logic
  }
}
```

## Error Properties

All error classes extend `CoolifyError` and include:

- `message` - Error message
- `statusCode` - HTTP status code (if available)
- `response` - Raw API response (if available)

### ValidationError Properties

`CoolifyValidationError` additionally includes:

- `errors` - Object mapping field names to error messages

```typescript
if (error instanceof CoolifyValidationError) {
  console.log(error.errors);
  // {
  //   "project_uuid": ["The project uuid field is required."],
  //   "name": ["The name field must be at least 3 characters."]
  // }
}
```

### RateLimitError Properties

`CoolifyRateLimitError` includes:

- `retryAfter` - Seconds to wait before retrying (if provided by API)

## Error Handling Patterns

### Retry Logic

```typescript
async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof CoolifyRateLimitError) {
        const delay = (error.retryAfter || 60) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries exceeded');
}
```

### Graceful Degradation

```typescript
async function getApplicationSafely(uuid: string) {
  try {
    return await coolify.applications.get(uuid);
  } catch (error) {
    if (error instanceof CoolifyNotFoundError) {
      return null; // Return null instead of throwing
    }
    throw error; // Re-throw other errors
  }
}
```

### Error Logging

```typescript
try {
  await coolify.applications.start('uuid');
} catch (error) {
  if (error instanceof CoolifyError) {
    // Log to your error tracking service
    logError({
      message: error.message,
      statusCode: error.statusCode,
      response: error.response,
    });
  }
  throw error;
}
```

## Next Steps

- Explore the [API Reference](/api/) for method-specific error handling
- Check out [Examples](/examples/) for real-world error handling patterns
