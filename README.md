# UI8Kit — Ultra-Fast UI System

A minimal, high-performance UI system combining **React Strict DOM**, **Tailwind-style utilities**, and **shadcn color tokens**.

## 🎯 Philosophy

**Zero overhead, maximum speed.**

- **< 2KB runtime** with React Strict DOM
- **No CSS files** — styles injected inline via StyleX
- **13 components** cover 80% of UI needs
- **Tailwind syntax** without Tailwind overhead

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Your Application                        │
├─────────────────────────────────────────────────────────────┤
│  UI8Kit Components    │  RSD Layouts + TWSX                 │
│  (Button, Card, etc.) │  (html.div, twsx('flex gap-4'))     │
├───────────────────────┴─────────────────────────────────────┤
│                    shadcn Color Tokens                       │
│     (--primary, --background, --foreground, etc.)           │
├─────────────────────────────────────────────────────────────┤
│                   React Strict DOM (RSD)                     │
│              (< 2KB, atomic CSS, cross-platform)            │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Three Layers

### 1. UI8Kit — Stateless Components
Pre-built components with CVA variants. No state, no hooks — pure styling.

```tsx
import { Button, Stack, Title, Text } from '@ui8kit/ui'

<Stack gap="lg" align="center">
  <Title size="4xl">Welcome</Title>
  <Text c="muted">Build fast UIs</Text>
  <Button variant="primary">Get Started</Button>
</Stack>
```

### 2. RSD + TWSX — Custom Layouts
React Strict DOM elements with Tailwind-style utilities.

```tsx
import { html } from 'react-strict-dom'
import { twsx } from '@/lib/twsx'

<html.div style={twsx('min-h-screen flex flex-col')}>
  <html.header style={twsx('w-full py-4 px-6 bg-background')} />
  <html.main style={twsx('flex-1 p-6 max-w-7xl mx-auto')} />
</html.div>
```

### 3. shadcn Colors — Design Tokens
Semantic color tokens via CSS variables.

```css
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(240 10% 4%);
  --primary: hsl(211 100% 50%);
  --secondary: hsl(210 40% 96%);
  --muted: hsl(210 40% 96%);
  --accent: hsl(210 40% 96%);
  --destructive: hsl(0 84% 60%);
}
```

## 🚀 Quick Start

```bash
# Clone with submodules
git clone --recurse-submodules https://github.com/ui8kit/create-app.git
cd create-app

# Install dependencies
bun install

# Start development
bun run dev:web
```

## 📁 Project Structure

```
apps/web/src/
├── components/ui/     # UI8Kit components (13)
├── variants/          # CVA variant definitions (12 modules)
├── lib/
│   ├── twsx.ts        # Tailwind → StyleX converter
│   └── utils.ts       # Utilities (cn, etc.)
├── layouts/           # RSD page layouts
└── blocks/            # RSD composite blocks
```

## 🎨 When to Use What

| Need | Use | Example |
|------|-----|---------|
| Button, Badge, Card | UI8Kit | `<Button variant="primary">` |
| Page layout | RSD + TWSX | `twsx('min-h-screen flex')` |
| Grid system | RSD + TWSX | `twsx('grid grid-cols-3 gap-4')` |
| Custom block | RSD + TWSX | `<html.section style={...}>` |
| Colors | shadcn tokens | `bg-primary`, `text-foreground` |

## 📚 Documentation

- **[101 Guide](./docs/101-guide.md)** — Complete introduction to the system
- **[AGENTS.md](./AGENTS.md)** — Instructions for AI coding agents

## 🔧 Rules Files

Three Cursor rules define how to use the system:

1. **`.cursor/rules/react-strict-dom.mdc`** — RSD elements and css.create()
2. **`.cursor/rules/twsx.mdc`** — Tailwind syntax for RSD
3. **`.cursor/rules/ui8kit.mdc`** — Component library usage

## ⚡ Performance

| Metric | Target |
|--------|--------|
| RSD Runtime | < 2KB gzipped |
| CSS Output | Atomic classes only |
| Bundle | Tree-shaken, no unused styles |
| First Paint | < 1.5s |

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

Built for speed. Designed for clarity. Zero overhead.
