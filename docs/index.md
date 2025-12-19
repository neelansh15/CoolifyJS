---
layout: home

hero:
  name: CoolifyJS
  text: TypeScript SDK for Coolify
  tagline: A clean, type-safe interface for managing your Coolify self-hosted PaaS instance programmatically
  image:
    src: /logo.svg
    alt: CoolifyJS
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/neelansh15/coolifyjs

features:
  - icon: 🔒
    title: Type-Safe
    details: Full TypeScript support with comprehensive type definitions for all API endpoints and responses
  - icon: 📦
    title: Complete API Coverage
    details: All 89 API endpoints across 11 resource categories - applications, databases, deployments, and more
  - icon: 🚀
    title: Modern & Lightweight
    details: ESM and CommonJS support, zero runtime dependencies, uses native fetch API
  - icon: 🛡️
    title: Error Handling
    details: Custom error classes for different API error types with detailed error information
  - icon: 📖
    title: Well Documented
    details: Comprehensive documentation with examples, guides, and API reference
  - icon: ⚡
    title: Easy to Use
    details: Intuitive API design that makes it simple to manage your Coolify instance

---

## Quick Start

```typescript
import { CoolifyClient } from '@neelansh/coolifyjs';

const coolify = new CoolifyClient({
  baseUrl: 'https://coolify.example.com/api/v1',
  token: 'your-api-token',
});

// List all applications
const apps = await coolify.applications.list();

// Start an application
await coolify.applications.start('app-uuid');

// Create a PostgreSQL database
await coolify.databases.createPostgreSQL({
  project_uuid: 'project-uuid',
  server_uuid: 'server-uuid',
  name: 'my-database',
});
```

## Installation

```bash
npm install @neelansh/coolifyjs
```

## What's Next?

- Read the [Getting Started Guide](/guide/getting-started) for a 5-minute tutorial
- Explore the [API Reference](/api/) for complete method documentation
- Check out [Examples](/examples/) for real-world use cases
- Learn about [Error Handling](/guide/error-handling) patterns
