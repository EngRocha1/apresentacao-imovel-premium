# Apresentação Imóvel Premium — Centro Teresina

Apresentação full-bleed premium (dark + neon gold) do apartamento 110 m² no Centro de Teresina.

## Multi-tenant & Segurança

- Cada usuário autenticado (Google / e-mail) possui **área isolada**.
- Slides e leads são filtrados por `ownerEmail`.
- Público acessa apenas via slug: `/tarcisio` (master) ou `/usuarioxpto`.
- Master (`tarcisiodiasdarocha@gmail.com`) é admin: pode listar usuários e revogar (desativar) contas.
- Outro usuário que criar conta inicia em branco, com seu próprio slug.

## Tecnologias

- **Público estático**: `index.html` + imagens (GitHub Pages)
- **Backend**: Convex (schema multi-tenant em `convex/`)
- **App dinâmico completo** (TanStack Start + Better Auth): disponível para deploy em Vercel + Convex. Código de referência no histórico do sandbox; isolamento aplicado no Convex.

## CI/CD

Workflow em `.github/workflows/ci.yml`:
- Checkout, typecheck (quando aplicável), verificação da partição Convex.
- Deploy automático de Pages na branch `main`.

## Como usar

1. Ative GitHub Pages nas configurações do repositório (source: GitHub Actions).
2. Para o app multi-usuário completo: conecte Convex (`npx convex dev`), configure auth, e faça deploy do frontend.
3. Master é criado automaticamente na primeira interação.

## Isolamento

Consultas e mutações no Convex exigem identidade. Usuários não veem nem podem apagar dados de outros.
