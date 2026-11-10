# Reserva Exclusiva

Apresentação em tela cheia do apartamento no Centro de Teresina. O formato acompanha o celular (stories) e o desktop (tela cheia).

## Ver agora

[Abrir apresentação](https://htmlpreview.github.io/?https://raw.githubusercontent.com/EngRocha1/apresentacao-imovel-premium/main/index.html)

Fotos em `images/`. Títulos e fotos novas feitas no Estúdio ficam neste navegador. O WhatsApp da Luane e do Tarcísio abre direto do botão flutuante.

## Convex

A partição está em `convex/`:

- `slides` — catálogo (título, descrição, foto, ordem)
- `leads` — pedidos de visita

```bash
npm install convex
npx convex dev
```

Isso gera `convex/_generated` e publica o deployment. No app publicado, a variável `CONVEX_URL` espelha cada salvamento de slide e cada contato.
