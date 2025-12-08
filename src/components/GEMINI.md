# UI Component Architecture

## 1. Context
Reusable UI components. Divided into "ui" (Primitives/Shadcn) and feature-specific components.

## 2. Patterns & Conventions
- **Radix/Shadcn**: Base components live in `src/components/ui`. **DO NOT** modify these unless improving the base design system.
- **Feature Components**: Group by feature (e.g., `src/components/recipes/RecipeCard.tsx`).
- **Composition**: Build complex features by composing `ui` primitives.

### UI Rules
- ✅ **DO**: Use `cn()` from `src/lib/utils.ts` for class merging.
  ```tsx
  <div className={cn("bg-red-500", className)}>
  ```
- ✅ **DO**: Use `lucide-react` for icons.
- ❌ **DON'T**: Hardcode hex colors. Use Tailwind classes (e.g., `bg-primary`, `text-muted-foreground`) to support Themes.

## 3. Key Files
- **Primitives**: `src/components/ui/**` (Button, Input, Card, etc.)
- **Navigation**: `src/components/navbar.tsx` (Global nav)
- **Theme Toggle**: `src/components/theme-toggle.tsx`

## 4. JIT Hints
- **Find Primitive**: `fd . src/components/ui`
- **Find Feature Component**: `rg "export function Recipe" src/components`
- **Check usage**: `rg "<AutoBidModal" src/`

## 5. Pre-PR Checks
- Ensure newly created components are responsive.
- Verify Dark Mode appearance (`next-themes` used).
