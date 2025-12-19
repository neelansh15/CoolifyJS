# Guide

Welcome to the CoolifyJS guide! This section will help you get started with the SDK and learn how to use it effectively.

## What is CoolifyJS?

CoolifyJS is a TypeScript SDK for the [Coolify API](https://coolify.io/docs/api-reference/authorization). It provides a clean, type-safe interface for managing your Coolify self-hosted PaaS instance programmatically.

## What You'll Learn

- **[Getting Started](/guide/getting-started)** - A 5-minute tutorial covering installation through your first API call
- **[Installation](/guide/installation)** - Detailed installation instructions and import patterns
- **[Configuration](/guide/configuration)** - All client configuration options and best practices
- **[Error Handling](/guide/error-handling)** - How to handle errors effectively with custom error classes

## Quick Example

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-api-token',
});

// List all applications
const apps = await coolify.applications.list();
console.log(`Found ${apps.length} applications`);
```

Ready to get started? Head over to the [Getting Started](/guide/getting-started) guide!
