# Resources

List all resources (applications, databases, services) across your Coolify instance.

## Methods

### `list()`

List all resources.

**Returns:** `Promise<ListResourcesResponse>`

**Example:**

```typescript
const resources = await coolify.resources.list();
console.log(`Applications: ${resources.applications.length}`);
console.log(`Databases: ${resources.databases.length}`);
console.log(`Services: ${resources.services.length}`);
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Applications](/api/applications) - Manage applications
- [Databases](/api/databases) - Manage databases
- [Services](/api/services) - Manage services
