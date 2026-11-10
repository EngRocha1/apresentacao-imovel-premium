import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const MASTER_EMAIL = "tarcisiodiasdarocha@gmail.com";

function isAdmin(email: string | null | undefined) {
  return email === MASTER_EMAIL;
}

export const listBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (!user || !user.active) return [];
    return await ctx.db
      .query("slides")
      .withIndex("by_owner_order", (q) => q.eq("ownerEmail", user.email))
      .collect();
  },
});

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.email) return [];
    return await ctx.db
      .query("slides")
      .withIndex("by_owner_order", (q) => q.eq("ownerEmail", identity.email))
      .collect();
  },
});

export const replaceMine = mutation({
  args: {
    slides: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
        image: v.string(),
        highlight: v.boolean(),
        cta: v.boolean(),
        sortOrder: v.number(),
      }),
    ),
  },
  handler: async (ctx, { slides }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.email) throw new Error("Não autenticado");
    const email = identity.email;

    // Ensure user exists (idempotent)
    let user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (!user) {
      const slug = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "") || "user";
      user = await ctx.db.insert("users", {
        email,
        slug,
        role: isAdmin(email) ? "admin" : "user",
        active: true,
        createdAt: Date.now(),
      });
    }

    const existing = await ctx.db
      .query("slides")
      .withIndex("by_owner_order", (q) => q.eq("ownerEmail", email))
      .collect();
    for (const row of existing) await ctx.db.delete(row._id);

    for (const item of slides) {
      const image = item.image.startsWith("data:") ? "/images/sala.jpg" : item.image;
      await ctx.db.insert("slides", { ...item, image, ownerEmail: email });
    }
    return { count: slides.length, slug: user?.slug };
  },
});
