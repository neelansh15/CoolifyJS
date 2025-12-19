# Errors Reference

Complete reference for all error classes exported by CoolifyJS.

## Error Classes

All error classes extend `CoolifyError` and can be imported from the package:

```typescript
import {
  CoolifyError,
  CoolifyAuthError,
  CoolifyNotFoundError,
  CoolifyValidationError,
  CoolifyRateLimitError,
  CoolifyServerError,
} from '@neelansh/coolifyjs';
```

## Base Error Class

### `CoolifyError`

Base error class for all SDK errors.

**Properties:**
- `message: string` - Error message
- `statusCode?: number` - HTTP status code (if available)
- `response?: unknown` - Raw API response (if available)

**Example:**

```typescript
try {
  await coolify.applications.get('invalid-uuid');
} catch (error) {
  if (error instanceof CoolifyError) {
    console.log('Error message:', error.message);
    console.log('Status code:', error.statusCode);
    console.log('Response:', error.response);
  }
}
```

## Authentication Error

### `CoolifyAuthError`

Thrown when authentication fails (HTTP 401).

**Properties:**
- `message: string` - Error message (default: "Authentication failed. Please check your API token.")
- `statusCode: 401`
- `response?: unknown` - Raw API response

**Example:**

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

## Not Found Error

### `CoolifyNotFoundError`

Thrown when a resource is not found (HTTP 404).

**Properties:**
- `message: string` - Error message (includes resource name and ID)
- `statusCode: 404`
- `response?: unknown` - Raw API response

**Constructor:**
```typescript
constructor(resource: string, id?: string)
```

**Example:**

```typescript
try {
  await coolify.applications.get('non-existent-uuid');
} catch (error) {
  if (error instanceof CoolifyNotFoundError) {
    console.log(`Resource not found: ${error.message}`);
    // Example: "Application with id 'non-existent-uuid' not found"
  }
}
```

## Validation Error

### `CoolifyValidationError`

Thrown when validation fails (HTTP 422).

**Properties:**
- `message: string` - Error message
- `statusCode: 422`
- `errors?: Record<string, string[]>` - Field-specific validation errors
- `response?: unknown` - Raw API response

**Example:**

```typescript
try {
  await coolify.applications.createFromPublicRepo({
    project_uuid: '', // Invalid: empty
    // Missing required fields
  });
} catch (error) {
  if (error instanceof CoolifyValidationError) {
    console.log('Validation errors:', error.errors);
    // Example:
    // {
    //   "project_uuid": ["The project uuid field is required."],
    //   "name": ["The name field must be at least 3 characters."]
    // }
  }
}
```

## Rate Limit Error

### `CoolifyRateLimitError`

Thrown when rate limit is exceeded (HTTP 429).

**Properties:**
- `message: string` - Error message (default: "Rate limit exceeded. Please try again later.")
- `statusCode: 429`
- `retryAfter?: number` - Seconds to wait before retrying (if provided by API)
- `response?: unknown` - Raw API response

**Example:**

```typescript
try {
  await coolify.applications.list();
} catch (error) {
  if (error instanceof CoolifyRateLimitError) {
    const retryAfter = error.retryAfter || 60;
    console.log(`Rate limited. Retry after ${retryAfter} seconds`);
    
    // Implement exponential backoff
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
  }
}
```

## Server Error

### `CoolifyServerError`

Thrown when the server returns an error (HTTP 500+).

**Properties:**
- `message: string` - Error message (default: "Internal server error")
- `statusCode: number` - HTTP status code (default: 500)
- `response?: unknown` - Raw API response

**Example:**

```typescript
try {
  await coolify.applications.start('app-uuid');
} catch (error) {
  if (error instanceof CoolifyServerError) {
    console.error('Server error:', error.message);
    console.error('Status code:', error.statusCode);
    
    // Log error for monitoring
    // Implement retry logic
  }
}
```

## Error Handling Patterns

### Check Error Type

```typescript
try {
  await coolify.applications.get('uuid');
} catch (error) {
  if (error instanceof CoolifyNotFoundError) {
    // Handle not found
  } else if (error instanceof CoolifyAuthError) {
    // Handle authentication
  } else if (error instanceof CoolifyValidationError) {
    // Handle validation
  } else if (error instanceof CoolifyRateLimitError) {
    // Handle rate limit
  } else if (error instanceof CoolifyServerError) {
    // Handle server error
  } else if (error instanceof CoolifyError) {
    // Handle other SDK errors
  } else {
    // Handle unexpected errors
  }
}
```

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
      type: error.constructor.name,
    });
  }
  throw error;
}
```

## Related

- [Error Handling Guide](/guide/error-handling) - Comprehensive error handling guide
- [API Reference](/api/) - Method documentation
