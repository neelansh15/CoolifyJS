# Teams

Manage teams and team members in your Coolify instance.

## Methods

### `list()`

List all teams.

**Returns:** `Promise<Team[]>`

**Example:**

```typescript
const teams = await coolify.teams.list();
console.log(`Found ${teams.length} teams`);
```

---

### `get(id: number)`

Get a specific team by ID.

**Parameters:**
- `id` - Team ID (number)

**Returns:** `Promise<Team>`

**Example:**

```typescript
const team = await coolify.teams.get(1);
console.log(`Team: ${team.name}`);
```

---

### `current()`

Get the current team.

**Returns:** `Promise<Team>`

**Example:**

```typescript
const currentTeam = await coolify.teams.current();
console.log(`Current team: ${currentTeam.name}`);
```

---

### `getMembers(id: number)`

Get members of a team.

**Parameters:**
- `id` - Team ID

**Returns:** `Promise<TeamMember[]>`

**Example:**

```typescript
const members = await coolify.teams.getMembers(1);
console.log(`Found ${members.length} members`);

members.forEach(member => {
  console.log(`- ${member.name} (${member.email})`);
});
```

---

### `getCurrentMembers()`

Get members of the current team.

**Returns:** `Promise<TeamMember[]>`

**Example:**

```typescript
const members = await coolify.teams.getCurrentMembers();
console.log(`Found ${members.length} members in current team`);
```

## Types

See the [Types Reference](/reference/types) for detailed type definitions.

## Related

- [Projects](/api/projects) - Projects are organized within teams
