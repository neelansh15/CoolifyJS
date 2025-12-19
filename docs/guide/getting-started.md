# Getting Started

This guide will help you get up and running with CoolifyJS in just a few minutes.

## Prerequisites

- Node.js 18 or higher
- A Coolify instance with API access enabled
- An API token from your Coolify instance

## Step 1: Install CoolifyJS

```bash
npm install @neelansh/coolifyjs
```

## Step 2: Get Your API Token

1. Log in to your Coolify instance
2. Go to **Settings** > **API Tokens**
3. Create a new API token
4. Copy the token (you won't be able to see it again!)

## Step 3: Create a Client

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-api-token-here',
});
```

Replace:
- `https://coolify.example.com/api/v1` with your Coolify instance API URL
- `your-api-token-here` with your actual API token

## Step 4: Make Your First API Call

Let's list all your applications:

```typescript
try {
  const apps = await coolify.applications.list();
  console.log(`Found ${apps.length} applications:`);
  
  apps.forEach(app => {
    console.log(`- ${app.name} (${app.uuid})`);
  });
} catch (error) {
  console.error('Error fetching applications:', error);
}
```

## Step 5: Try More Operations

### Get a Specific Application

```typescript
const app = await coolify.applications.get('app-uuid');
console.log(`Application: ${app.name}`);
console.log(`Status: ${app.status}`);
```

### Start an Application

```typescript
await coolify.applications.start('app-uuid');
console.log('Application started!');
```

### List Databases

```typescript
const databases = await coolify.databases.list();
console.log(`Found ${databases.length} databases`);
```

## Next Steps

- Learn about [Configuration](/guide/configuration) options
- Read about [Error Handling](/guide/error-handling) patterns
- Explore the [API Reference](/api/) for all available methods
- Check out [Examples](/examples/) for real-world use cases

## Common Issues

### Authentication Error

If you get an authentication error, verify:
- Your API token is correct
- The token hasn't expired
- API access is enabled in your Coolify instance settings

### Connection Error

If you can't connect:
- Verify your `baseUrl` is correct (should end with `/api/v1`)
- Check that your Coolify instance is accessible
- Ensure there are no firewall or network issues

## Need Help?

- Check the [API Reference](/api/) for detailed method documentation
- See [Examples](/examples/) for common use cases
- Open an issue on [GitHub](https://github.com/neelansh15/coolifyjs/issues)
