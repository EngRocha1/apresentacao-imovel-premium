import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const MASTER_EMAIL = "tarcisiodiasdarocha@gmail.com";

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity?.email) return [];
    return await ctx.db
      .query("leads")
      .withIndex("by_owner", (q) => q.eq("ownerEmail", identity.email))
      .order("desc")
      .take(100);
  },
});

export const create = mutation({
  args: {
    ownerSlug: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_slug", (q) => q.eq("slug", args.ownerSlug))
      .unique();
    if (!user || !user.active) throw new Error("Proprietário não encontrado");
    return await ctx.db.insert("leads", {
      ownerEmail: user.email,
      name: args.name,
      phone: args.phone,
      email: args.email,
      message: args.message,
      createdAt: Date.now(),
    });
  },
});

export const listAllForAdmin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity?.email !== MASTER_EMAIL) return [];
    return await ctx.db.query("leads").order("desc").take(200);
  },
});
