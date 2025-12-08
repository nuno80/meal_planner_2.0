# App Router & API Patterns

## 1. Context
Contains all application routes, pages, layouts, and backend API endpoints using Next.js 15 App Router.

## 2. Key Commands
- **Create Page**: New folder + `page.tsx`
- **Create Layout**: `layout.tsx` (wraps children)
- **Create API**: `route.ts` (GET, POST, etc.)

## 3. Patterns & Conventions
- **Structure**: Feature-based folder nesting (e.g., `src/app/dashboard/settings/page.tsx`).
- **Data Fetching**: Use Server Components for fetching directly where possible.
- **Client Boundary**: Add `'use client'` at the very top of files needing hooks/interactivity.
- **Metadata**: Export `metadata` object in `page.tsx` or `layout.tsx` for SEO.

### File Organization
- ✅ **Pages**: `src/app/[feature]/page.tsx`
- ✅ **API**: `src/app/api/[resource]/route.ts` (e.g., `src/app/api/webhooks/clerk/route.ts`)
- ❌ **DON'T**: Put complex UI logic in `page.tsx`. Extract to `src/components`.

## 4. Touch Points
- **Entry**: `src/app/layout.tsx` (Root HTML/Body, Providers)
- **Global CSS**: Imported in `src/app/layout.tsx`
- **Auth Guard**: Checked via `src/middleware.tsx` (Clerk)

## 5. JIT Hints
- **Find Routes**: `fd "page.tsx" src/app`
- **Find API Handlers**: `fd "route.ts" src/app`
- **Check Layouts**: `fd "layout.tsx" src/app`

## 6. Common Gotchas
- **Async Components**: Server components are async by default (`export default async function Page()`).
- **Params**: `params` in Next.js 15 are Promises. `const resolvedParams = await props.params;`.
- **Navigation**: Use `next/link` for internal links, NOT `<a>`.
