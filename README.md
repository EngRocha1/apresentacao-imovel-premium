# Apresentação Imóvel Premium

Apresentação full-bleed de imóvel no Centro de Teresina.

## Link público

https://engrocha1.github.io/apresentacao-imovel-premium/

## Áreas (isolamento por tenant)

| Path | Área | Descrição |
|------|------|-----------|
| `/admin` | Admin Geral | Gestão de usuários e políticas (acesso restrito) |
| `/domricardo` | Marca atual | Postagem inicial (owner exclusivo) |
| `/{slug}` | AdminCliente | Cada dono tem seu slug único |
| `/{slug}/agendamentos` | Cliente do Cliente | Status das solicitações de visita |

- Slides e leads filtrados por owner.
- Slugs únicos verificados.
- Novo usuário começa em branco.

## Convex

Schema multi-tenant em `convex/`. Pronto para deploy.
