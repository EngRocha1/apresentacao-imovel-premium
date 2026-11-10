import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  slides: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.string(),
    highlight: v.boolean(),
    cta: v.boolean(),
    sortOrder: v.number(),
  }).index("by_order", ["sortOrder"]),
  leads: defineTable({
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    message: v.optional(v.string()),
  }),
});
