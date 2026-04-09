import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import ws from "ws";
import * as schema from "./schema";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema });

// ------- definitions matching the approved schema plan -------

const ROLES = [
  { name: "super_admin", displayName: "Super Admin", description: "Full access to everything" },
  { name: "admin", displayName: "Admin", description: "Full access except user deletion" },
  { name: "content_manager", displayName: "Content Manager", description: "Blog and services content" },
  { name: "sales_manager", displayName: "Sales Manager", description: "Leads and client relationships" },
  { name: "staff_viewer", displayName: "Staff Viewer", description: "Read-only access" },
] as const;

const PERMISSION_DEFS: Array<{ key: string; group: string; description: string }> = [
  // blog
  { key: "blog.view", group: "blog", description: "View blog posts" },
  { key: "blog.create", group: "blog", description: "Create blog posts" },
  { key: "blog.edit", group: "blog", description: "Edit blog posts" },
  { key: "blog.delete", group: "blog", description: "Delete blog posts" },
  { key: "blog.publish", group: "blog", description: "Publish blog posts" },
  // service
  { key: "service.view", group: "service", description: "View service pages" },
  { key: "service.create", group: "service", description: "Create service pages" },
  { key: "service.edit", group: "service", description: "Edit service pages" },
  { key: "service.delete", group: "service", description: "Delete service pages" },
  // lead
  { key: "lead.view", group: "lead", description: "View leads" },
  { key: "lead.create", group: "lead", description: "Create leads" },
  { key: "lead.edit", group: "lead", description: "Edit leads" },
  { key: "lead.delete", group: "lead", description: "Delete leads" },
  { key: "lead.assign", group: "lead", description: "Assign leads" },
  { key: "lead.export", group: "lead", description: "Export leads" },
  // team
  { key: "team.view", group: "team", description: "View team members" },
  { key: "team.create", group: "team", description: "Create team members" },
  { key: "team.edit", group: "team", description: "Edit team members" },
  { key: "team.delete", group: "team", description: "Delete team members" },
  // analytics
  { key: "analytics.view", group: "analytics", description: "View analytics" },
  { key: "analytics.export", group: "analytics", description: "Export analytics" },
  // settings
  { key: "settings.view", group: "settings", description: "View settings" },
  { key: "settings.edit", group: "settings", description: "Edit settings" },
  // user
  { key: "user.view", group: "user", description: "View users" },
  { key: "user.create", group: "user", description: "Create users" },
  { key: "user.edit", group: "user", description: "Edit users" },
  { key: "user.delete", group: "user", description: "Delete users" },
  { key: "user.assign_role", group: "user", description: "Assign roles to users" },
  // role admin
  { key: "role.view", group: "role", description: "View roles" },
  { key: "role.create", group: "role", description: "Create roles" },
  { key: "role.edit", group: "role", description: "Edit roles" },
  { key: "role.delete", group: "role", description: "Delete roles" },
  { key: "role.manage_permissions", group: "role", description: "Manage role permissions" },
  // permission admin
  { key: "permission.view", group: "permission", description: "View permissions" },
  { key: "permission.create", group: "permission", description: "Create permissions" },
  { key: "permission.edit", group: "permission", description: "Edit permissions" },
  { key: "permission.delete", group: "permission", description: "Delete permissions" },
  // menu admin
  { key: "menu.view", group: "menu", description: "View menus" },
  { key: "menu.create", group: "menu", description: "Create menus" },
  { key: "menu.edit", group: "menu", description: "Edit menus" },
  { key: "menu.delete", group: "menu", description: "Delete menus" },
  // blog categories
  { key: "blog_category.view", group: "blog_category", description: "View blog categories" },
  { key: "blog_category.create", group: "blog_category", description: "Create blog categories" },
  { key: "blog_category.edit", group: "blog_category", description: "Edit blog categories" },
  { key: "blog_category.delete", group: "blog_category", description: "Delete blog categories" },
  // our company
  { key: "our_company.view", group: "our_company", description: "View Our Company page content" },
  { key: "our_company.edit", group: "our_company", description: "Edit Our Company page content and clients" },
  // mission vision values
  { key: "mission_vision.view", group: "mission_vision", description: "View Mission / Vision / Core Values content" },
  { key: "mission_vision.edit", group: "mission_vision", description: "Edit Mission / Vision / Core Values content" },
  // contact
  { key: "contact_page.view", group: "contact_page", description: "View Contact page content" },
  { key: "contact_page.edit", group: "contact_page", description: "Edit Contact page content and trust points" },
];

const MENU_SEED: Array<{
  key: string;
  label: string;
  href: string;
  icon: string;
  requiredGroup: string | null;
  sortOrder: number;
  parentKey: string | null;
}> = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", requiredGroup: null, sortOrder: 10, parentKey: null },
  { key: "blog", label: "Blog Management", href: "#", icon: "FileText", requiredGroup: null, sortOrder: 20, parentKey: null },
  { key: "blog_posts", label: "Posts", href: "/dashboard/blog", icon: "FileText", requiredGroup: "blog", sortOrder: 10, parentKey: "blog" },
  { key: "blog_categories", label: "Categories", href: "/dashboard/blog-categories", icon: "Tag", requiredGroup: "blog_category", sortOrder: 20, parentKey: "blog" },
  { key: "services", label: "Services", href: "/dashboard/services", icon: "Briefcase", requiredGroup: "service", sortOrder: 30, parentKey: null },
  { key: "about_us", label: "About Us", href: "#", icon: "Building2", requiredGroup: null, sortOrder: 35, parentKey: null },
  { key: "our_company", label: "Our Company", href: "/dashboard/about-us/our-company", icon: "Building2", requiredGroup: "our_company", sortOrder: 10, parentKey: "about_us" },
  { key: "mission_vision_values", label: "Mission, Vision & Values", href: "/dashboard/about-us/mission-vision-values", icon: "Target", requiredGroup: "mission_vision", sortOrder: 20, parentKey: "about_us" },
  { key: "team", label: "Our Team", href: "/dashboard/team", icon: "Users2", requiredGroup: "team", sortOrder: 30, parentKey: "about_us" },
  { key: "leads", label: "Leads", href: "/dashboard/leads", icon: "UsersRound", requiredGroup: "lead", sortOrder: 40, parentKey: null },
  { key: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3", requiredGroup: "analytics", sortOrder: 60, parentKey: null },
  { key: "contact", label: "Contact", href: "/dashboard/contact", icon: "Mail", requiredGroup: "contact_page", sortOrder: 65, parentKey: null },
  { key: "user_management", label: "User Management", href: "#", icon: "Shield", requiredGroup: null, sortOrder: 70, parentKey: null },
  { key: "users", label: "Users", href: "/dashboard/users", icon: "User", requiredGroup: "user", sortOrder: 10, parentKey: "user_management" },
  { key: "roles", label: "Roles", href: "/dashboard/roles", icon: "Shield", requiredGroup: "role", sortOrder: 20, parentKey: "user_management" },
  { key: "permissions", label: "Permissions", href: "/dashboard/permissions", icon: "KeyRound", requiredGroup: "permission", sortOrder: 30, parentKey: "user_management" },
  { key: "menus", label: "Menus", href: "/dashboard/menus", icon: "ListTree", requiredGroup: "menu", sortOrder: 40, parentKey: "user_management" },
  { key: "settings", label: "Settings", href: "/dashboard/settings", icon: "Settings", requiredGroup: "settings", sortOrder: 110, parentKey: null },
];

const ROLE_PERMISSION_MAP: Record<string, (key: string) => boolean> = {
  super_admin: () => true,
  admin: (k) => k !== "user.delete",
  content_manager: (k) =>
    k.startsWith("blog.") ||
    k.startsWith("blog_category.") ||
    k.startsWith("service.") ||
    k.startsWith("our_company.") ||
    k.startsWith("mission_vision.") ||
    k.startsWith("team.") ||
    k.startsWith("contact_page.") ||
    k === "analytics.view",
  sales_manager: (k) => k.startsWith("lead.") || k === "analytics.view" || k === "blog.view",
  staff_viewer: (k) => k.endsWith(".view"),
};

async function seed() {
  console.log("→ seeding roles…");
  for (const r of ROLES) {
    await db
      .insert(schema.roles)
      .values({
        id: randomUUID(),
        name: r.name,
        displayName: r.displayName,
        description: r.description,
        isSystem: true,
      })
      .onConflictDoNothing();
  }

  console.log("→ seeding permissions…");
  for (const p of PERMISSION_DEFS) {
    await db
      .insert(schema.permissions)
      .values({ id: randomUUID(), key: p.key, group: p.group, description: p.description })
      .onConflictDoNothing();
  }

  const dbRoles = await db.select().from(schema.roles);
  const dbPerms = await db.select().from(schema.permissions);
  const roleByName = Object.fromEntries(dbRoles.map((r) => [r.name, r.id]));
  const permByKey = Object.fromEntries(dbPerms.map((p) => [p.key, p.id]));

  console.log("→ assigning role → permissions…");
  for (const role of ROLES) {
    const predicate = ROLE_PERMISSION_MAP[role.name];
    for (const perm of PERMISSION_DEFS) {
      if (predicate(perm.key)) {
        await db
          .insert(schema.rolePermissions)
          .values({
            roleId: roleByName[role.name],
            permissionId: permByKey[perm.key],
          })
          .onConflictDoNothing();
      }
    }
  }

  console.log("→ seeding menus…");
  for (const m of MENU_SEED) {
    await db
      .insert(schema.menus)
      .values({
        id: randomUUID(),
        key: m.key,
        label: m.label,
        href: m.href,
        icon: m.icon,
        requiredGroup: m.requiredGroup,
        sortOrder: m.sortOrder,
        isActive: true,
      })
      .onConflictDoNothing();
  }

  const dbMenus = await db.select().from(schema.menus);
  const menuIdByKey = Object.fromEntries(dbMenus.map((m) => [m.key, m.id]));

  for (const m of MENU_SEED) {
    const targetId = menuIdByKey[m.key];
    if (!targetId) continue;
    const parentId = m.parentKey ? menuIdByKey[m.parentKey] ?? null : null;
    await db
      .update(schema.menus)
      .set({
        parentId,
        sortOrder: m.sortOrder,
        href: m.href,
        icon: m.icon,
        label: m.label,
        requiredGroup: m.requiredGroup,
        updatedAt: new Date(),
      })
      .where(eq(schema.menus.key, m.key));
  }

  console.log("→ seeding users…");
  const demoUsers = [
    { email: "admin@thebrandghar.com", password: "admin123", fullName: "Sagar (Super Admin)", role: "super_admin" },
    { email: "content@thebrandghar.com", password: "content123", fullName: "Content Manager", role: "content_manager" },
    { email: "sales@thebrandghar.com", password: "sales123", fullName: "Sales Manager", role: "sales_manager" },
    { email: "viewer@thebrandghar.com", password: "viewer123", fullName: "Staff Viewer", role: "staff_viewer" },
  ];

  for (const u of demoUsers) {
    const hash = await bcrypt.hash(u.password, 10);
    await db
      .insert(schema.users)
      .values({
        id: randomUUID(),
        email: u.email,
        passwordHash: hash,
        fullName: u.fullName,
        roleId: roleByName[u.role],
        emailVerifiedAt: new Date(),
        isActive: true,
      })
      .onConflictDoNothing();
  }

  console.log("→ seeding team members…");
  const TEAM_MEMBERS = [
    { fullName: "Team Member 1", role: "Founder & CEO", sortOrder: 10 },
    { fullName: "Team Member 2", role: "Creative Director", sortOrder: 20 },
    { fullName: "Team Member 3", role: "Head of Marketing", sortOrder: 30 },
    { fullName: "Team Member 4", role: "Lead Developer", sortOrder: 40 },
    { fullName: "Team Member 5", role: "Content Strategist", sortOrder: 50 },
    { fullName: "Team Member 6", role: "SEO Specialist", sortOrder: 60 },
  ];
  const existingTeam = await db.select().from(schema.teamMembers);
  if (existingTeam.length === 0) {
    for (const m of TEAM_MEMBERS) {
      await db.insert(schema.teamMembers).values({
        id: randomUUID(),
        fullName: m.fullName,
        role: m.role,
        sortOrder: m.sortOrder,
        isActive: true,
      });
    }
  }

  console.log("→ seeding blog categories…");
  const BLOG_CATEGORIES_SEED = [
    { name: "Digital Marketing", slug: "digital-marketing", sortOrder: 10 },
    { name: "Branding & Design", slug: "branding-design", sortOrder: 20 },
    { name: "SEO", slug: "seo", sortOrder: 30 },
    { name: "Social Media", slug: "social-media", sortOrder: 40 },
    { name: "Business Growth", slug: "business-growth", sortOrder: 50 },
  ];
  for (const c of BLOG_CATEGORIES_SEED) {
    await db
      .insert(schema.blogCategories)
      .values({
        id: randomUUID(),
        name: c.name,
        slug: c.slug,
        sortOrder: c.sortOrder,
        isActive: true,
      })
      .onConflictDoNothing();
  }

  console.log("→ seeding blog posts…");
  const BLOG_SEED = [
    {
      slug: "how-to-turn-social-media-into-a-sales-machine",
      title: "How to Turn Social Media into a Sales Machine",
      excerpt: "Discover the exact strategies top brands use to convert followers into paying customers. From content funnels to retargeting — a complete breakdown.",
      content: "Most brands treat social media as a popularity contest. Followers, likes, and impressions feel good — but they don't pay the bills.\n\nThe brands winning on social in 2026 treat every post as a step in a funnel. Awareness at the top, engagement in the middle, conversion at the bottom.",
      category: "Digital Marketing",
      readTimeMinutes: 8,
      isFeatured: true,
    },
    {
      slug: "5-seo-mistakes-that-are-killing-your-rankings",
      title: "5 SEO Mistakes That Are Killing Your Rankings",
      excerpt: "Avoid these common SEO pitfalls that prevent your website from showing up on Google's first page.",
      content: "If your website isn't ranking, it's almost never because Google doesn't like you. It's because you're making one of these five mistakes.",
      category: "SEO",
      readTimeMinutes: 6,
    },
    {
      slug: "why-your-brand-needs-a-visual-identity-system",
      title: "Why Your Brand Needs a Visual Identity System",
      excerpt: "A logo alone isn't enough. Learn why a complete visual identity system is essential for brand recognition.",
      content: "A logo is a signature. A visual identity system is a vocabulary.",
      category: "Branding & Design",
      readTimeMinutes: 5,
    },
    {
      slug: "meta-ads-vs-google-ads-which-one-is-right-for-you",
      title: "Meta Ads vs Google Ads: Which One is Right for You?",
      excerpt: "A detailed comparison to help you decide where to invest your ad budget for maximum ROI.",
      content: "Meta captures demand before it exists. Google captures demand that already exists.",
      category: "Digital Marketing",
      readTimeMinutes: 7,
    },
    {
      slug: "content-calendar-how-to-plan-30-days-in-2-hours",
      title: "Content Calendar: How to Plan 30 Days in 2 Hours",
      excerpt: "Our step-by-step framework for building a month's worth of social media content efficiently.",
      content: "Batching is the secret weapon of every content team that actually ships.",
      category: "Social Media",
      readTimeMinutes: 5,
    },
    {
      slug: "how-small-businesses-in-nepal-can-scale-with-digital-marketing",
      title: "How Small Businesses in Nepal Can Scale with Digital Marketing",
      excerpt: "Practical strategies tailored for Nepali businesses looking to grow their online presence and sales.",
      content: "The playbook that works for a Silicon Valley SaaS company doesn't always work for a Kathmandu boutique.",
      category: "Business Growth",
      readTimeMinutes: 6,
    },
  ];
  const existingBlog = await db.select().from(schema.blogPosts);
  if (existingBlog.length === 0) {
    let order = 0;
    for (const p of BLOG_SEED) {
      await db.insert(schema.blogPosts).values({
        id: randomUUID(),
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        readTimeMinutes: p.readTimeMinutes,
        status: "published",
        isFeatured: p.isFeatured ?? false,
        publishedAt: new Date(Date.now() - order * 86400000 * 3),
      });
      order++;
    }
  }

  console.log("→ seeding our company page…");
  const OUR_COMPANY_SINGLETON_ID = "singleton";
  const existingOurCompany = await db
    .select()
    .from(schema.ourCompanyPage)
    .where(eq(schema.ourCompanyPage.id, OUR_COMPANY_SINGLETON_ID))
    .limit(1);
  if (existingOurCompany.length === 0) {
    await db.insert(schema.ourCompanyPage).values({
      id: OUR_COMPANY_SINGLETON_ID,
      storyEyebrow: "Our Story",
      storyHeading: "Building Brands That",
      storyHeadingAccent: "Stand Out",
      storyBody:
        "Founded in Kathmandu in 2025, Brandghar was built on one mission — to make great marketing accessible to every ambitious business ready to grow. We bridge creative storytelling with data-driven strategy, helping brands stand out and scale in the digital space.\n\nToday, we're a full-service digital marketing agency delivering everything from Meta Ads and SEO to brand identity and web development. Our team treats every client's brand as their own — no shortcuts, no vanity metrics, just honest marketing that drives real results.",
      estYear: "2025",
      storyImageUrl: "/medias/our-story.png",
    });
  }

  console.log("→ seeding our company clients…");
  const CLIENT_SEED = [
    { name: "Aarambha School", logoUrl: "/medias/clients/logo-aarambha.webp", sortOrder: 10 },
    { name: "ANT", logoUrl: "/medias/clients/logo-ant.jpg", sortOrder: 20 },
    { name: "Lashes", logoUrl: "/medias/clients/logo-lashes.png", sortOrder: 30 },
    { name: "Neo Money Transfer", logoUrl: "/medias/clients/logo-neomoney.svg", sortOrder: 40 },
    { name: "PCPS", logoUrl: "/medias/clients/logo-pcps.webp", sortOrder: 50 },
    { name: "Shatakshee", logoUrl: "/medias/clients/logo-shatakshee.webp", sortOrder: 60 },
    { name: "IKON", logoUrl: "/medias/clients/Logo.png", sortOrder: 70 },
  ];
  const existingClients = await db.select().from(schema.ourCompanyClients);
  if (existingClients.length === 0) {
    for (const c of CLIENT_SEED) {
      await db.insert(schema.ourCompanyClients).values({
        id: randomUUID(),
        name: c.name,
        logoUrl: c.logoUrl,
        sortOrder: c.sortOrder,
        isActive: true,
      });
    }
  }

  console.log("→ seeding mission vision page…");
  const MVV_SINGLETON_ID = "singleton";
  const existingMvv = await db
    .select()
    .from(schema.missionVisionPage)
    .where(eq(schema.missionVisionPage.id, MVV_SINGLETON_ID))
    .limit(1);
  if (existingMvv.length === 0) {
    await db.insert(schema.missionVisionPage).values({
      id: MVV_SINGLETON_ID,
      missionText:
        "To empower businesses in Nepal to grow, compete, and lead in the digital space by delivering result-driven marketing strategies, creative content, and innovative technology solutions that turn audiences into loyal customers.",
      visionText:
        "To become Nepal's most trusted and impactful digital growth partner, known for transforming brands into market leaders through creativity, strategy, and measurable results.",
    });
  }

  console.log("→ seeding core values…");
  const CORE_VALUES_SEED = [
    { title: "Results First", description: "We focus on outcomes that matter—growth, leads, and real business impact, not just vanity metrics.", icon: "Target", sortOrder: 10 },
    { title: "Creativity with Purpose", description: "Every design, content, and campaign is crafted not just to look good, but to perform and convert.", icon: "Lightbulb", sortOrder: 20 },
    { title: "Client Success is Our Success", description: "We grow when our clients grow. We build long-term partnerships, not short-term projects.", icon: "Handshake", sortOrder: 30 },
    { title: "Innovation & Adaptability", description: "We stay ahead of trends, platforms, and technologies to keep our clients ahead of competition.", icon: "Rocket", sortOrder: 40 },
    { title: "Integrity & Transparency", description: "We believe in honest communication, clear reporting, and ethical marketing practices.", icon: "ShieldCheck", sortOrder: 50 },
    { title: "Consistency & Discipline", description: "Success comes from consistent execution. We deliver quality work on time, every time.", icon: "Clock", sortOrder: 60 },
  ];
  const existingValues = await db.select().from(schema.coreValues);
  if (existingValues.length === 0) {
    for (const v of CORE_VALUES_SEED) {
      await db.insert(schema.coreValues).values({
        id: randomUUID(),
        title: v.title,
        description: v.description,
        icon: v.icon,
        sortOrder: v.sortOrder,
        isActive: true,
      });
    }
  }

  console.log("→ seeding contact page…");
  const CONTACT_SINGLETON_ID = "singleton";
  const existingContact = await db
    .select()
    .from(schema.contactPage)
    .where(eq(schema.contactPage.id, CONTACT_SINGLETON_ID))
    .limit(1);
  if (existingContact.length === 0) {
    await db.insert(schema.contactPage).values({
      id: CONTACT_SINGLETON_ID,
      heroEyebrow: "Get In Touch",
      heroHeading: "Let's Build Something",
      heroHeadingAccent: "Great Together.",
      heroSubtitle:
        "Whether you're ready to launch a campaign, need a digital strategy, or just want to explore how we can help your brand grow — we're here for you. Reach out to us through any of the channels below, and let's start the conversation.",
      phoneNumber: "+977 984 765 3969",
      phoneHours: "Sun – Fri 9:00 – 19:00",
      locationLabel: "Pulchowk, Lalitpur",
      locationUrl: "https://maps.app.goo.gl/7ciR46P3kDiREmq39",
      emailAddress: "hello@thebrandghar.com",
      emailReplyNote: "We typically respond within 24 hours.",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3533.2477379991824!2d85.317387!3d27.678737!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190070d90675%3A0xadc7b3ded91c119c!2sThe%20Brand%20Ghar!5e0!3m2!1sen!2snl!4v1775562345567!5m2!1sen!2snl",
      instagramUrl: "https://www.instagram.com/thebrandghar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      facebookUrl: "https://www.facebook.com/thebrandghar",
      tiktokUrl: "https://www.tiktok.com/@the.brand.ghar",
      linkedinUrl: "https://www.linkedin.com/company/brandghar/?viewAsMember=true",
      quickHelpHeading: "Need Immediate Help?",
      whatsappUrl: "https://wa.me/9779847653969",
    });
  }

  console.log("→ seeding contact trust points…");
  const TRUST_POINTS_SEED = [
    { text: "Experienced team", icon: "Users", sortOrder: 10 },
    { text: "Result-driven approach", icon: "Target", sortOrder: 20 },
    { text: "End-to-end services", icon: "Layers", sortOrder: 30 },
    { text: "Trusted by growing brands", icon: "ShieldCheck", sortOrder: 40 },
  ];
  const existingTrust = await db.select().from(schema.contactTrustPoints);
  if (existingTrust.length === 0) {
    for (const tp of TRUST_POINTS_SEED) {
      await db.insert(schema.contactTrustPoints).values({
        id: randomUUID(),
        text: tp.text,
        icon: tp.icon,
        sortOrder: tp.sortOrder,
        isActive: true,
      });
    }
  }

  console.log("✓ seed complete");
  console.log("");
  console.log("Demo credentials:");
  for (const u of demoUsers) {
    console.log(`  ${u.role.padEnd(16)}  ${u.email}  /  ${u.password}`);
  }
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
