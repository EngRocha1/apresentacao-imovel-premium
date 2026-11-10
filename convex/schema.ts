import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Multi-tenant schema for real-estate presentations.
 * Each user (by email/slug) owns isolated slides + leads.
 * Master admin (tarcisiodiasdarocha@gmail.com) can manage all.
 */
export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    slug: v.string(), // public path: /{slug}
    role: v.union(v.literal("admin"), v.literal("user")),
    active: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_slug", ["slug"]),

  slides: defineTable({
    ownerEmail: v.string(), // denormalized for fast filter + ownership check
    title: v.string(),
    description: v.string(),
    image: v.string(),
    highlight: v.boolean(),
    cta: v.boolean(),
    sortOrder: v.number(),
  }).index("by_owner_order", ["ownerEmail", "sortOrder"]),

  leads: defineTable({
    ownerEmail: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    message: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_owner", ["ownerEmail"]),
});
