import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const MASTER_EMAIL = "tarcisiodiasdarocha@gmail.com";

export const ensureMaster = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", MASTER_EMAIL))
      .unique();
    if (existing) return existing;
    return await ctx.db.insert("users", {
      email: MASTER_EMAIL,
      name: "Tarcísio Dias da Rocha",
      slug: "tarcisio",
      role: "admin",
      active: true,
      createdAt: Date.now(),
    });
  },
});

export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity?.email !== MASTER_EMAIL) return [];
    return await ctx.db.query("users").collect();
  },
});

export const setActive = mutation({
  args: { email: v.string(), active: v.boolean() },
  handler: async (ctx, { email, active }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity?.email !== MASTER_EMAIL) throw new Error("Apenas o administrador");
    if (email === MASTER_EMAIL) throw new Error("Não é possível desativar o master");
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (!user) throw new Error("Usuário não encontrado");
    await ctx.db.patch(user._id, { active });
    return { ok: true };
  },
});
