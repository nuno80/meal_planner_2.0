# GEMINI.md - Project Intelligence

## 1. Project Snapshot
- **Type**: Single Next.js 15 App (App Router)
- **Stack**: React 19, TypeScript, Tailwind CSS, Clerk Auth
- **State**: `src/` directory containment strategy
- **Testing**: Currently manual only (no test runner)

## 2. Root Setup
- **Install**: `pnpm install`
- **Dev**: `pnpm dev`
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`

## 3. Universal Conventions
- **Strict TypeScript**: No `any`, strictly typed props.
- **Styling**: Tailwind CSS exclusively. No CSS modules.
- **Composability**: Use Radix/Shadcn primitives in `src/components/ui`.
- **Absolute Imports**: Always use `@/` (e.g., `@/components/ui/button`).
- **Commits**: Conventional (e.g., `feat:`, `fix:`, `chore:`).

## 4. Security & Secrets
- **Env Vars**: `.env` (local), `.env.local` (local overrides).
- **Public**: `NEXT_PUBLIC_` prefix for client exposure.
- **Secrets**: API keys (Clerk, DB) NEVER commit.
- **Middleware**: `src/middleware.tsx` handles protected routes (Clerk).

## 5. JIT Index (Just-In-Time)

### Directory Map
- **Routing & Pages**: `src/app/` → [see src/app/GEMINI.md](src/app/GEMINI.md)
- **UI Components**: `src/components/` → [see src/components/GEMINI.md](src/components/GEMINI.md)
- **Utilities**: `src/lib/` → Shared helpers (small scope).
- **Hooks**: `src/hooks/` → Custom React hooks.

### Quick Find Commands
- **Find Page**: `fd "page.tsx" src/app`
- **Find API**: `rg "export async function (GET|POST)" src/app/api`
- **Find Component**: `fd -e tsx . src/components`
- **Search Content**: `rg -i "search_term" src`

## 6. Definition of Done
1.  `pnpm lint` passes without errors.
2.  `pnpm build` completes successfully.
3.  No console errors in Browser DevTools.
4.  Mobile responsiveness verified.
