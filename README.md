# Reserva Exclusiva — Apresentação Premium de Imóvel

Apresentação imersiva e dinâmica para imóvel de alto padrão no Centro de Teresina.

## Recursos

- **Visualização dinâmica** que se adapta perfeitamente a qualquer tela (Feed 1:1 / Stories 9:16)
- Tema dark com acentos dourados neon (sempre ativo)
- Todas as fotos do imóvel já alocadas
- Área administrativa com login (demo: `admin@imovel.com` / `123456`)
- Edição de títulos e descrições + upload de novas fotos (salva localmente)
- Botão flutuante de WhatsApp
- Melhores práticas de marketing imobiliário de luxo

## Visualizar

**[Abrir Apresentação](https://htmlpreview.github.io/?https://raw.githubusercontent.com/EngRocha1/apresentacao-imovel-premium/main/index.html)**

## Próximo nível (Convex)

Para persistência real, autenticação Google e armazenamento de imagens:

1. Criar projeto no [Convex](https://convex.dev)
2. Usar o schema abaixo em `convex/schema.ts`
3. Integrar Convex Auth + File Storage

```ts
// convex/schema.ts (exemplo)
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  slides: defineTable({
    title: v.string(),
    description: v.string(),
    imageId: v.optional(v.id("_storage")),
    order: v.number(),
  }).index("by_order", ["order"]),
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
  }),
});
```

Repositório: https://github.com/EngRocha1/apresentacao-imovel-premium
