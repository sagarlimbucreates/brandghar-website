import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// Note: SQLite doesn't have native ENUM, UUID, or INET types.
// - UUIDs are stored as TEXT (generated via crypto.randomUUID() in app code).
// - ENUMs are stored as TEXT with a CHECK constraint-equivalent validation at the app layer.
// - Timestamps are stored as INTEGER (unix seconds) via `{ mode: "timestamp" }`.

// =========================================================================
// roles
// =========================================================================
export const roles = sqliteTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  description: text("description"),
  isSystem: integer("is_system", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// =========================================================================
// permissions
// =========================================================================
export const permissions = sqliteTable(
  "permissions",
  {
    id: text("id").primaryKey(),
    key: text("key").notNull().unique(),
    group: text("group").notNull(),
    description: text("description"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    groupIdx: index("permissions_group_idx").on(table.group),
  })
);

// =========================================================================
// role_permissions (N:M)
// =========================================================================
export const rolePermissions = sqliteTable(
  "role_permissions",
  {
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
    permissionId: text("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
    permissionIdx: index("role_permissions_permission_idx").on(table.permissionId),
  })
);

// =========================================================================
// users
// =========================================================================
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    fullName: text("full_name").notNull(),
    avatarUrl: text("avatar_url"),
    roleId: text("role_id")
      .notNull()
      .references(() => roles.id),
    emailVerifiedAt: integer("email_verified_at", { mode: "timestamp" }),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
    failedLoginCount: integer("failed_login_count").notNull().default(0),
    lockedUntil: integer("locked_until", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
    roleIdx: index("users_role_idx").on(table.roleId),
    activeIdx: index("users_active_idx").on(table.isActive),
  })
);

// =========================================================================
// user_permissions (direct grant/deny overrides)
// =========================================================================
export const userPermissions = sqliteTable(
  "user_permissions",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    permissionId: text("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
    effect: text("effect", { enum: ["grant", "deny"] }).notNull(),
    grantedBy: text("granted_by").references(() => users.id),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.permissionId] }),
  })
);

// =========================================================================
// sessions
// =========================================================================
export const sessions = sqliteTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    revokedAt: integer("revoked_at", { mode: "timestamp" }),
    lastSeenAt: integer("last_seen_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    userIdx: index("sessions_user_idx").on(table.userId),
    tokenHashIdx: uniqueIndex("sessions_token_hash_idx").on(table.tokenHash),
    expiresIdx: index("sessions_expires_idx").on(table.expiresAt),
  })
);

// =========================================================================
// user_tokens (email verify / password reset / invite)
// =========================================================================
export const userTokens = sqliteTable(
  "user_tokens",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type", { enum: ["email_verify", "password_reset", "invite"] }).notNull(),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    usedAt: integer("used_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    userTypeIdx: index("user_tokens_user_type_idx").on(table.userId, table.type),
    tokenHashIdx: uniqueIndex("user_tokens_token_hash_idx").on(table.tokenHash),
  })
);

// =========================================================================
// audit_logs
// =========================================================================
export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id").references(() => users.id),
    action: text("action").notNull(),
    entityType: text("entity_type"),
    entityId: text("entity_id"),
    metadata: text("metadata", { mode: "json" }),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    userIdx: index("audit_logs_user_idx").on(table.userId),
    actionIdx: index("audit_logs_action_idx").on(table.action),
    createdIdx: index("audit_logs_created_idx").on(table.createdAt),
    entityIdx: index("audit_logs_entity_idx").on(table.entityType, table.entityId),
  })
);

// =========================================================================
// menus (dashboard navigation items, editable via UI)
// =========================================================================
export const menus = sqliteTable(
  "menus",
  {
    id: text("id").primaryKey(),
    key: text("key").notNull().unique(),
    label: text("label").notNull(),
    href: text("href").notNull(),
    icon: text("icon").notNull(), // lucide icon name string, resolved via registry
    requiredGroup: text("required_group"), // if null, any authed user sees it
    parentId: text("parent_id"), // self-referencing; null = top-level
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    sortIdx: index("menus_sort_idx").on(table.sortOrder),
    activeIdx: index("menus_active_idx").on(table.isActive),
    parentIdx: index("menus_parent_idx").on(table.parentId),
  })
);

// =========================================================================
// team_members (public-facing team on /about-us/our-team)
// =========================================================================
export const teamMembers = sqliteTable(
  "team_members",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    role: text("role").notNull(), // job title, e.g. "Founder & CEO"
    bio: text("bio"),
    photoUrl: text("photo_url"),
    linkedinUrl: text("linkedin_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    sortIdx: index("team_members_sort_idx").on(table.sortOrder),
    activeIdx: index("team_members_active_idx").on(table.isActive),
  })
);

// =========================================================================
// blog_categories
// =========================================================================
export const blogCategories = sqliteTable(
  "blog_categories",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    nameIdx: uniqueIndex("blog_categories_name_idx").on(table.name),
    slugIdx: uniqueIndex("blog_categories_slug_idx").on(table.slug),
    sortIdx: index("blog_categories_sort_idx").on(table.sortOrder),
  })
);

// =========================================================================
// blog_posts
// =========================================================================
export const blogPosts = sqliteTable(
  "blog_posts",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    content: text("content").notNull().default(""),
    category: text("category").notNull(),
    coverImageUrl: text("cover_image_url"),
    author: text("author"),
    readTimeMinutes: integer("read_time_minutes").notNull().default(5),
    status: text("status", { enum: ["draft", "published"] })
      .notNull()
      .default("draft"),
    isFeatured: integer("is_featured", { mode: "boolean" })
      .notNull()
      .default(false),
    publishedAt: integer("published_at", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    slugIdx: uniqueIndex("blog_posts_slug_idx").on(table.slug),
    statusIdx: index("blog_posts_status_idx").on(table.status),
    featuredIdx: index("blog_posts_featured_idx").on(table.isFeatured),
    publishedIdx: index("blog_posts_published_idx").on(table.publishedAt),
    categoryIdx: index("blog_posts_category_idx").on(table.category),
  })
);

// =========================================================================
// our_company_page (singleton — one row with id='singleton')
// =========================================================================
export const ourCompanyPage = sqliteTable("our_company_page", {
  id: text("id").primaryKey(),
  storyEyebrow: text("story_eyebrow").notNull().default("Our Story"),
  storyHeading: text("story_heading").notNull(),
  storyHeadingAccent: text("story_heading_accent").notNull(),
  storyBody: text("story_body").notNull(),
  estYear: text("est_year").notNull().default("2025"),
  storyImageUrl: text("story_image_url"),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// =========================================================================
// our_company_clients
// =========================================================================
export const ourCompanyClients = sqliteTable(
  "our_company_clients",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    logoUrl: text("logo_url"),
    websiteUrl: text("website_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    sortIdx: index("our_company_clients_sort_idx").on(table.sortOrder),
    activeIdx: index("our_company_clients_active_idx").on(table.isActive),
  })
);

// =========================================================================
// mission_vision_page (singleton)
// =========================================================================
export const missionVisionPage = sqliteTable("mission_vision_page", {
  id: text("id").primaryKey(),
  missionText: text("mission_text").notNull(),
  visionText: text("vision_text").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// =========================================================================
// core_values
// =========================================================================
export const coreValues = sqliteTable(
  "core_values",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    icon: text("icon").notNull().default("Target"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    sortIdx: index("core_values_sort_idx").on(table.sortOrder),
    activeIdx: index("core_values_active_idx").on(table.isActive),
  })
);

// =========================================================================
// contact_page (singleton — one row with id='singleton')
// =========================================================================
export const contactPage = sqliteTable("contact_page", {
  id: text("id").primaryKey(),
  // Hero
  heroEyebrow: text("hero_eyebrow").notNull().default("Get In Touch"),
  heroHeading: text("hero_heading").notNull(),
  heroHeadingAccent: text("hero_heading_accent").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  // Contact info
  phoneNumber: text("phone_number").notNull(),
  phoneHours: text("phone_hours"),
  locationLabel: text("location_label").notNull(),
  locationUrl: text("location_url"),
  emailAddress: text("email_address").notNull(),
  emailReplyNote: text("email_reply_note"),
  // Map embed iframe src
  mapEmbedUrl: text("map_embed_url"),
  // Social
  instagramUrl: text("instagram_url"),
  facebookUrl: text("facebook_url"),
  tiktokUrl: text("tiktok_url"),
  linkedinUrl: text("linkedin_url"),
  // Quick help CTA
  quickHelpHeading: text("quick_help_heading").notNull().default(
    "Need Immediate Help?"
  ),
  whatsappUrl: text("whatsapp_url"),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

// =========================================================================
// contact_trust_points (collection for Why Brandghar on contact page)
// =========================================================================
export const contactTrustPoints = sqliteTable(
  "contact_trust_points",
  {
    id: text("id").primaryKey(),
    text: text("text").notNull(),
    icon: text("icon").notNull().default("Users"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    sortIdx: index("contact_trust_points_sort_idx").on(table.sortOrder),
    activeIdx: index("contact_trust_points_active_idx").on(table.isActive),
  })
);

// =========================================================================
// leads (consultation requests submitted from public forms)
// =========================================================================
export const leads = sqliteTable(
  "leads",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    service: text("service"),
    message: text("message"),
    source: text("source", { enum: ["hero_landing", "contact_page"] })
      .notNull()
      .default("hero_landing"),
    isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
    readAt: integer("read_at", { mode: "timestamp" }),
    readBy: text("read_by").references(() => users.id),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => ({
    isReadIdx: index("leads_is_read_idx").on(table.isRead),
    createdIdx: index("leads_created_idx").on(table.createdAt),
    sourceIdx: index("leads_source_idx").on(table.source),
  })
);

// =========================================================================
// Type exports
// =========================================================================
export type Role = typeof roles.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Menu = typeof menus.$inferSelect;
export type NewMenu = typeof menus.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type BlogCategory = typeof blogCategories.$inferSelect;
export type NewBlogCategory = typeof blogCategories.$inferInsert;
export type OurCompanyPageRow = typeof ourCompanyPage.$inferSelect;
export type OurCompanyClient = typeof ourCompanyClients.$inferSelect;
export type NewOurCompanyClient = typeof ourCompanyClients.$inferInsert;
export type MissionVisionPageRow = typeof missionVisionPage.$inferSelect;
export type CoreValue = typeof coreValues.$inferSelect;
export type NewCoreValue = typeof coreValues.$inferInsert;
export type ContactPageRow = typeof contactPage.$inferSelect;
export type ContactTrustPoint = typeof contactTrustPoints.$inferSelect;
export type NewContactTrustPoint = typeof contactTrustPoints.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
