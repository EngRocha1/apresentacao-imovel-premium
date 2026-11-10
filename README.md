# Apresentação Imóvel Premium — Multi-tenant

Apresentação full-bleed + áreas isoladas por tenant.

## Três áreas (padrão App Router)

| Path | Área | Quem acessa |
|------|------|-------------|
| `/admin` | Admin Geral | Apenas `tarcisiodiasdarocha@gmail.com` |
| `/{slug}` | AdminCliente (marca) | Dono da marca (ex: `/tarcisio`) |
| `/{slug}/agendamentos` | Cliente do Cliente | Lead que agendou visita |

- Cada AdminCliente tem um **slug único** (tabela `brands`).
- Slides e leads são filtrados por `owner_email`.
- Novo usuário começa em branco com seu próprio slug.

## CI / Pages

Workflow em `.github/workflows/ci.yml`.  
O job `pages` só faz deploy se o GitHub Pages estiver habilitado (Settings → Pages → Source: GitHub Actions).

Link público (após ativar):  
https://engrocha1.github.io/apresentacao-imovel-premium/

## Convex

Schema multi-tenant em `convex/` (`ownerEmail`, `slug`, roles).  
Pronto para `npx convex dev`.
