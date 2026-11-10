import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const slide = v.object({
  title: v.string(),
  description: v.string(),
  image: v.string(),
  highlight: v.boolean(),
  cta: v.boolean(),
  sortOrder: v.number(),
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("slides").withIndex("by_order").collect();
  },
});

export const replaceCatalog = mutation({
  args: { slides: v.array(slide) },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("slides").collect();
    for (const row of existing) await ctx.db.delete(row._id);
    for (const item of args.slides) {
      const image = item.image.startsWith("data:") ? "/imovel/sala.jpg" : item.image;
      await ctx.db.insert("slides", { ...item, image });
    }
    return { count: args.slides.length };
  },
});
