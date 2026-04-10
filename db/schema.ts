import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  serial,
  jsonb,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// =========================================================================
// roles
// =========================================================================
export const roles = pgTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  displayName: text("display_name").notNull(),
  description: text("description"),
  isSystem: boolean("is_system").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// =========================================================================
// permissions
// =========================================================================
export const permissions = pgTable(
  "permissions",
  {
    id: text("id").primaryKey(),
    key: text("key").notNull().unique(),
    group: text("group").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    groupIdx: index("permissions_group_idx").on(table.group),
  })
);

// =========================================================================
// role_permissions (N:M)
// =========================================================================
export const rolePermissions = pgTable(
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
export const users = pgTable(
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
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    failedLoginCount: integer("failed_login_count").notNull().default(0),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
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
export const userPermissions = pgTable(
  "user_permissions",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    permissionId: text("permission_id")
      .notNull()
      .references(() => permissions.id, { onDelete: "cascade" }),
    effect: text("effect").notNull(), // 'grant' | 'deny'
    grantedBy: text("granted_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.permissionId] }),
  })
);

// =========================================================================
// sessions
// =========================================================================
export const sessions = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
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
export const userTokens = pgTable(
  "user_tokens",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // 'email_verify' | 'password_reset' | 'invite'
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    usedAt: timestamp("used_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userTypeIdx: index("user_tokens_user_type_idx").on(table.userId, table.type),
    tokenHashIdx: uniqueIndex("user_tokens_token_hash_idx").on(table.tokenHash),
  })
);

// =========================================================================
// audit_logs
// =========================================================================
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id),
    action: text("action").notNull(),
    entityType: text("entity_type"),
    entityId: text("entity_id"),
    metadata: jsonb("metadata"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("audit_logs_user_idx").on(table.userId),
    actionIdx: index("audit_logs_action_idx").on(table.action),
    createdIdx: index("audit_logs_created_idx").on(table.createdAt),
    entityIdx: index("audit_logs_entity_idx").on(table.entityType, table.entityId),
  })
);

// =========================================================================
// menus (dashboard navigation, editable via UI)
// =========================================================================
export const menus = pgTable(
  "menus",
  {
    id: text("id").primaryKey(),
    key: text("key").notNull().unique(),
    label: text("label").notNull(),
    href: text("href").notNull(),
    icon: text("icon").notNull(),
    requiredGroup: text("required_group"),
    parentId: text("parent_id"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("menus_sort_idx").on(table.sortOrder),
    activeIdx: index("menus_active_idx").on(table.isActive),
    parentIdx: index("menus_parent_idx").on(table.parentId),
  })
);

// =========================================================================
// team_members
// =========================================================================
export const teamMembers = pgTable(
  "team_members",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    role: text("role").notNull(),
    bio: text("bio"),
    photoUrl: text("photo_url"),
    linkedinUrl: text("linkedin_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("team_members_sort_idx").on(table.sortOrder),
    activeIdx: index("team_members_active_idx").on(table.isActive),
  })
);

// =========================================================================
// blog_categories
// =========================================================================
export const blogCategories = pgTable(
  "blog_categories",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
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
export const blogPosts = pgTable(
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
    status: text("status").notNull().default("draft"), // 'draft' | 'published'
    isFeatured: boolean("is_featured").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
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
// our_company_page (singleton)
// =========================================================================
export const ourCompanyPage = pgTable("our_company_page", {
  id: text("id").primaryKey(),
  storyEyebrow: text("story_eyebrow").notNull().default("Our Story"),
  storyHeading: text("story_heading").notNull(),
  storyHeadingAccent: text("story_heading_accent").notNull(),
  storyBody: text("story_body").notNull(),
  estYear: text("est_year").notNull().default("2025"),
  storyImageUrl: text("story_image_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// =========================================================================
// our_company_clients
// =========================================================================
export const ourCompanyClients = pgTable(
  "our_company_clients",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    logoUrl: text("logo_url"),
    websiteUrl: text("website_url"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("our_company_clients_sort_idx").on(table.sortOrder),
    activeIdx: index("our_company_clients_active_idx").on(table.isActive),
  })
);

// =========================================================================
// mission_vision_page (singleton)
// =========================================================================
export const missionVisionPage = pgTable("mission_vision_page", {
  id: text("id").primaryKey(),
  missionText: text("mission_text").notNull(),
  visionText: text("vision_text").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// =========================================================================
// core_values
// =========================================================================
export const coreValues = pgTable(
  "core_values",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    icon: text("icon").notNull().default("Target"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("core_values_sort_idx").on(table.sortOrder),
    activeIdx: index("core_values_active_idx").on(table.isActive),
  })
);

// =========================================================================
// contact_page (singleton)
// =========================================================================
export const contactPage = pgTable("contact_page", {
  id: text("id").primaryKey(),
  heroEyebrow: text("hero_eyebrow").notNull().default("Get In Touch"),
  heroHeading: text("hero_heading").notNull(),
  heroHeadingAccent: text("hero_heading_accent").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  phoneNumber: text("phone_number").notNull(),
  phoneHours: text("phone_hours"),
  locationLabel: text("location_label").notNull(),
  locationUrl: text("location_url"),
  emailAddress: text("email_address").notNull(),
  emailReplyNote: text("email_reply_note"),
  mapEmbedUrl: text("map_embed_url"),
  instagramUrl: text("instagram_url"),
  facebookUrl: text("facebook_url"),
  tiktokUrl: text("tiktok_url"),
  linkedinUrl: text("linkedin_url"),
  quickHelpHeading: text("quick_help_heading").notNull().default("Need Immediate Help?"),
  whatsappUrl: text("whatsapp_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// =========================================================================
// contact_trust_points
// =========================================================================
export const contactTrustPoints = pgTable(
  "contact_trust_points",
  {
    id: text("id").primaryKey(),
    text: text("text").notNull(),
    icon: text("icon").notNull().default("Users"),
    sortOrder: integer("sort_order").notNull().default(0),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    sortIdx: index("contact_trust_points_sort_idx").on(table.sortOrder),
    activeIdx: index("contact_trust_points_active_idx").on(table.isActive),
  })
);

// =========================================================================
// leads
// =========================================================================
export const leads = pgTable(
  "leads",
  {
    id: text("id").primaryKey(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    service: text("service"),
    message: text("message"),
    source: text("source").notNull().default("hero_landing"), // 'hero_landing' | 'contact_page' | 'navbar_cta'
    status: text("status").notNull().default("pending"), // 'pending' | 'follow_up' | 're_follow' | 'converted'
    isRead: boolean("is_read").notNull().default(false),
    readAt: timestamp("read_at", { withTimezone: true }),
    readBy: text("read_by").references(() => users.id),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    isReadIdx: index("leads_is_read_idx").on(table.isRead),
    statusIdx: index("leads_status_idx").on(table.status),
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
