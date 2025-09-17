# Strapi 5 Collection Type Setup Guide

## Critical: File Extensions and Structure

**❌ WRONG**: Using `.js` files
**✅ CORRECT**: Using `.ts` files (TypeScript)

All Strapi 5 APIs in this project MUST use TypeScript files (.ts) to appear in the Users & Permissions plugin.

## Required File Structure for Collection Types

For any new Collection Type (e.g., `team-member`):

```
src/api/[collection-name]/
├── content-types/
│   └── [collection-name]/
│       └── schema.json
├── controllers/
│   └── [collection-name].ts    ← MUST be .ts
├── routes/
│   └── [collection-name].ts    ← MUST be .ts
└── services/
    └── [collection-name].ts    ← MUST be .ts
```

## File Templates

### 1. Routes File (`routes/[collection-name].ts`)
```typescript
/**
 * [collection-name] router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::[collection-name].[collection-name]');
```

### 2. Controller File (`controllers/[collection-name].ts`)
```typescript
/**
 * [collection-name] controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::[collection-name].[collection-name]');
```

### 3. Service File (`services/[collection-name].ts`)
```typescript
/**
 * [collection-name] service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::[collection-name].[collection-name]');
```

## Schema JSON Structure

The `schema.json` must have matching names:

```json
{
  "kind": "collectionType",
  "collectionName": "[collection_name_with_underscores]",
  "info": {
    "singularName": "[collection-name]",
    "pluralName": "[collection-name]s",
    "displayName": "[Display Name]"
  }
}
```

## Key Points

1. **Folder name** = `singularName` (e.g., `team-member`)
2. **API endpoint** = `pluralName` (e.g., `/api/team-members`)
3. **All files** must be `.ts` (TypeScript)
4. **UID format** = `api::[singularName].[singularName]`

## Permissions Setup

After creating the Collection Type:

1. Restart Strapi server
2. Go to `Settings > Users & Permissions Plugin > Roles > Public`
3. Find your Collection Type in the list
4. Enable `find` and `findOne` permissions
5. Save

## Common Issues

- **404 API Error**: Missing `.ts` files or wrong file extensions
- **Not in Permissions**: Files are `.js` instead of `.ts`
- **Schema errors**: Folder name doesn't match `singularName`

## Example: Team Member Collection Type

- Folder: `src/api/team-member/`
- Schema: `singularName: "team-member"`, `pluralName: "team-members"`
- API: `GET /api/team-members`
- Files: All `.ts` extensions