# ESLint and Prettier Configuration

This project now uses an ESLint configuration inspired by `@apify/eslint-config` with custom rules for code quality and consistency.

## Key Features

### 1. **Single Quotes**

All string literals must use single quotes instead of double quotes.

```typescript
// ✅ Good
const message = 'Hello, world!';

// ❌ Bad
const message = 'Hello, world!';
```

### 2. **Import Sorting**

Imports are automatically sorted and separated into groups:

1. Side effect imports
2. Node.js built-ins (with `node:` prefix)
3. External packages (npm modules)
4. Internal packages (starting with `@/`, `~/`, or `.`)
5. Parent imports (`../`)
6. Relative imports (`./<file>`)
7. Style imports (`.css`, `.scss`)

Example:

```typescript
// External packages
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Internal imports
import { authClient } from '@/lib/auth';
import { Button } from '../ui/button';
import { Input } from './input';

// Styles
import './globals.css';
```

### 3. **Additional Rules**

- No `var` declarations (use `const` or `let`)
- Prefer `const` over `let` when possible
- Prefer template literals over string concatenation
- Object shorthand notation
- TypeScript: Consistent type imports with inline syntax
- Unused variables starting with `_` are allowed
- Console statements warn (except `console.warn` and `console.error`)

## Scripts

```bash
# Lint all files
yarn lint

# Lint and auto-fix issues
yarn lint:fix

# Format all files with Prettier
yarn format

# Check if files are formatted correctly
yarn format:check
```

## Configuration Files

- **`.prettierrc.json`** - Prettier configuration
- **`.prettierignore`** - Files/directories to exclude from formatting
- **`eslint.config.mjs`** - ESLint flat config with custom rules

## Integration

Both ESLint and Prettier work together:

- ESLint handles code quality and import organization
- Prettier handles code formatting (indentation, line breaks, etc.)

Run both before committing:

```bash
yarn lint:fix && yarn format
```
