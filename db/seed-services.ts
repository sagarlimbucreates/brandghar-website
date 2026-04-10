import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { randomUUID } from "node:crypto";
import ws from "ws";
import * as schema from "./schema";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema });

const SERVICES: schema.NewService[] = [
  {
    id: randomUUID(),
    slug: "social-media-mastery",
    title: "Social Media Mastery",
    eyebrow: "Our Service",
    heading: "Social Media",
    headingAccent: "Mastery",
    description:
      "A complete system designed to grow your brand, engage your audience, and convert attention into revenue using strategic content, branding, and performance marketing.",
    heroImageUrl: "/medias/illustrations/social-media-mastery.jpg",
    icon: "Megaphone",
    shortDescription:
      "Build a strong, engaging presence across platforms that keeps your audience coming back.",
    bullets: ["Content Strategy", "Community Engagement", "Performance Tracking"],
    cardImageUrl: "/medias/services/social-media.png",
    problems: [
      "Posting but getting no engagement",
      "Followers not converting into customers",
      "No clear content strategy",
      "Inconsistent branding",
      "Running ads but no results",
      "No measurable growth or analytics tracking",
    ],
    deliverables: [
      { icon: "ClipboardList", title: "Strategy & Planning", items: ["Social media audit", "Competitor analysis", "Content strategy & positioning", "Monthly content calendar"] },
      { icon: "Pencil", title: "Content Creation", items: ["Reels / TikTok content", "Carousel & static posts", "Script writing & hooks", "Captions + CTA optimization"] },
      { icon: "Palette", title: "Branding & Positioning", items: ["Visual identity consistency", "Tone of voice & messaging", "Brand storytelling"] },
      { icon: "TrendingUp", title: "Growth & Engagement", items: ["Hashtag strategy", "Engagement strategy (DM, comments)", "Community building"] },
      { icon: "BarChart3", title: "Performance Marketing", items: ["Meta Ads (Facebook & Instagram)", "Funnel setup (Awareness to Conversion)", "Retargeting campaigns"] },
      { icon: "LineChart", title: "Analytics & Optimization", items: ["Weekly/monthly reports", "Performance tracking", "Continuous improvement"] },
    ],
    processSteps: [
      { icon: "Search", title: "Audit & Research", step: "01" },
      { icon: "Target", title: "Strategy Development", step: "02" },
      { icon: "Clapperboard", title: "Content Production", step: "03" },
      { icon: "Send", title: "Publishing & Promotion", step: "04" },
      { icon: "TrendingUp", title: "Optimization & Scaling", step: "05" },
    ],
    extraSections: [
      {
        type: "tags",
        eyebrow: "Where We Operate",
        heading: "Platforms We",
        headingAccent: "Work On",
        items: ["Instagram", "Facebook", "TikTok", "YouTube Shorts", "LinkedIn (for B2B clients)"],
      },
    ],
    ctaHeading: "Ready to Grow Your Brand on Social Media?",
    ctaDescription: "Let's build a strategy that turns your social media into a revenue-generating machine.",
    ctaButtonText: "Book Free Strategy Call",
    ctaButtonHref: "/#contact",
    sortOrder: 10,
  },
  {
    id: randomUUID(),
    slug: "influencer-partnerships",
    title: "Influencer Partnerships",
    eyebrow: "Our Service",
    heading: "Turn Influence into",
    headingAccent: "Impact",
    description:
      "We connect brands with the right creators to deliver authentic content that drives engagement, trust, and sales.",
    secondaryDescription:
      "Influencer Partnership is a strategic collaboration between brands and content creators to promote products through authentic storytelling, helping brands reach targeted audiences with trust and credibility.",
    heroImageUrl: "/medias/illustrations/influencers.webp",
    icon: "PenTool",
    shortDescription:
      "We craft scroll-stopping visuals, videos, and copy that connect and convert.",
    bullets: ["Video Production", "Graphic Design", "Copywriting"],
    cardImageUrl: "/medias/services/content-creation.png",
    problems: [
      "Collaborating with wrong influencers",
      "No clear ROI from influencer campaigns",
      "Fake followers & low engagement",
      "Poor content quality",
      "No structured campaign strategy",
      "Inconsistent brand messaging across creators",
    ],
    deliverables: [
      { icon: "Target", title: "Influencer Discovery & Matching", items: ["Niche-based influencer selection", "Audience analysis (real vs fake)", "Micro & macro influencer sourcing"] },
      { icon: "Handshake", title: "Campaign Strategy", items: ["Campaign goal setting (awareness, sales)", "Content themes & messaging", "Platform-specific strategy"] },
      { icon: "Clapperboard", title: "Content Collaboration", items: ["Script & concept support", "Content direction (Reels, TikTok, Shorts)", "Brand alignment & storytelling"] },
      { icon: "BarChart3", title: "Campaign Execution & Management", items: ["Influencer coordination", "Timeline & deliverable tracking", "Communication handling"] },
      { icon: "TrendingUp", title: "Performance Tracking", items: ["Reach, engagement & conversion tracking", "ROI analysis", "Campaign reporting"] },
      { icon: "Users", title: "Creator Network Management", items: ["Vetted creator database", "Relationship management", "Long-term partnership building"] },
    ],
    processSteps: [
      { icon: "Search", title: "Identify Goals", step: "01" },
      { icon: "Target", title: "Select Influencers", step: "02" },
      { icon: "Brain", title: "Plan Campaign", step: "03" },
      { icon: "Clapperboard", title: "Create Content", step: "04" },
      { icon: "Rocket", title: "Launch Campaign", step: "05" },
      { icon: "BarChart3", title: "Analyze & Optimize", step: "06" },
    ],
    extraSections: [
      { type: "iconGrid", eyebrow: "For Brands", heading: "Why Partner with", headingAccent: "Creators", items: [{ icon: "Eye", text: "Reach your ideal audience" }, { icon: "Users", text: "Build trust through real creators" }, { icon: "ShoppingCart", text: "Increase conversions & sales" }, { icon: "Clapperboard", text: "High-quality, relatable content" }] },
      { type: "tags", eyebrow: "For Creators", heading: "Why Partner with", headingAccent: "Brandghar", items: ["Paid collaborations & brand deals", "Creative direction & content support", "Work with premium brands", "Long-term partnerships"] },
      { type: "iconGrid", eyebrow: "What We Run", heading: "Types of", headingAccent: "Campaigns", items: [{ icon: "Megaphone", title: "Product Promotions" }, { icon: "Eye", title: "Brand Awareness Campaigns" }, { icon: "Rocket", title: "Launch Campaigns" }, { icon: "CalendarCheck", title: "Event Promotions" }, { icon: "Camera", title: "User-Generated Content (UGC)" }] },
      { type: "iconGrid", eyebrow: "What To Expect", heading: "Results You Can", headingAccent: "Expect", items: [{ icon: "TrendingUp", text: "Increased brand visibility" }, { icon: "MessageSquare", text: "Higher engagement" }, { icon: "ShoppingCart", text: "Direct sales impact" }, { icon: "Handshake", text: "Strong brand trust" }] },
      { type: "tags", eyebrow: "Why Us", heading: "Why", headingAccent: "Brandghar", items: ["Data-driven influencer selection", "Focus on ROI, not just reach", "Strong creator network in Nepal", "End-to-end campaign execution"] },
    ],
    ctaHeading: "Ready to Launch Your Influencer Campaign?",
    ctaDescription: "Let's connect you with the right creators and build campaigns that deliver real results.",
    ctaButtonText: "Connect with Us",
    ctaButtonHref: "/contact",
    sortOrder: 20,
  },
  {
    id: randomUUID(),
    slug: "strategic-ad-placements",
    title: "Strategic Ad Placements",
    eyebrow: "Our Service",
    heading: "Be Seen Where It",
    headingAccent: "Matters",
    description:
      "From streets to skylines — we strategically place your brand where attention is guaranteed.",
    secondaryDescription:
      "Strategic Ad Placement is about positioning your brand in high-visibility, high-impact locations — ensuring maximum exposure, recall, and real-world presence.",
    heroImageUrl: "/medias/illustrations/ad-placement.png",
    icon: "BarChart3",
    shortDescription:
      "Data-driven ad campaigns built to generate leads, sales, and real ROI.",
    bullets: ["Audience Targeting", "Ad Creative & Testing", "ROI Optimization"],
    cardImageUrl: "/medias/services/performance.png",
    problems: [
      "Ads placed in low-visibility areas",
      "Wasted budget on poor locations",
      "No targeting in offline marketing",
      "Designs that don't stand out in public spaces",
    ],
    deliverables: [
      { icon: "MapPin", title: "Location Strategy", items: ["High-traffic area identification", "Audience movement analysis", "Prime placement selection"] },
      { icon: "Brain", title: "Creative Design", items: ["Billboard & hoarding design", "Flex banners & print ads", "Large-format visual optimization"] },
      { icon: "Building2", title: "Ad Placement Execution", items: ["Hoarding board placements", "Street pole banners", "Mall & commercial space branding"] },
      { icon: "Printer", title: "Print & Production", items: ["High-quality print materials", "Durable outdoor media", "End-to-end production handling"] },
      { icon: "BarChart3", title: "Impact Tracking", items: ["Visibility estimation", "Area-based reach analysis", "Campaign reporting"] },
      { icon: "Target", title: "Campaign Consultation", items: ["Budget planning & allocation", "Location-based ROI forecasting", "Multi-channel placement strategy"] },
    ],
    processSteps: [
      { icon: "Search", title: "Location Research", step: "01" },
      { icon: "Target", title: "Audience Mapping", step: "02" },
      { icon: "Palette", title: "Creative Design", step: "03" },
      { icon: "Hammer", title: "Production & Printing", step: "04" },
      { icon: "MapPin", title: "Strategic Placement", step: "05" },
      { icon: "BarChart3", title: "Visibility & Optimization", step: "06" },
    ],
    extraSections: [
      { type: "iconGrid", eyebrow: "Placement Options", heading: "Types of Ad", headingAccent: "Placements", items: [{ icon: "Building2", title: "Billboard / Hoarding Boards" }, { icon: "MapPin", title: "Street Pole Banners" }, { icon: "Building2", title: "Mall Branding" }, { icon: "TrendingUp", title: "Transit Advertising" }, { icon: "Building2", title: "Skyline / Premium Locations" }] },
      { type: "iconGrid", eyebrow: "What To Expect", heading: "Results You Can", headingAccent: "Expect", items: [{ icon: "Eye", text: "Massive brand visibility" }, { icon: "Lightbulb", text: "Strong recall — people remember you" }, { icon: "TrendingUp", text: "Increased inquiries & footfall" }, { icon: "Building2", text: "Premium brand positioning" }] },
      { type: "tags", eyebrow: "Why Us", heading: "Why", headingAccent: "Brandghar", items: ["Strategic placement, not random booking", "Strong creative that stands out in real-world clutter", "Local market expertise (Nepal traffic zones, hotspots)", "End-to-end execution (idea to placement)"] },
    ],
    ctaHeading: "Ready to Put Your Brand in the Spotlight?",
    ctaDescription: "Let's position your brand where it gets maximum visibility and real-world impact.",
    ctaButtonText: "Plan Your Campaign",
    ctaButtonHref: "/#contact",
    sortOrder: 30,
  },
  {
    id: randomUUID(),
    slug: "search-engine-optimization",
    title: "Search Engine Optimization",
    eyebrow: "Our Service",
    heading: "Rank Higher. Get Found.",
    headingAccent: "Grow Faster.",
    description:
      "We position your business at the top of search results — bringing you high-intent traffic that converts into customers.",
    secondaryDescription:
      "Search Engine Optimization (SEO) is the process of improving your website's visibility on search engines like Google — helping your business attract organic traffic, generate leads, and increase sales without paid ads.",
    icon: "Search",
    shortDescription:
      "Improve your rankings, attract the right traffic, and grow your business organically.",
    bullets: ["Keyword Research", "On-Page SEO", "Link Building"],
    cardImageUrl: "/medias/services/seo.png",
    problems: [
      "Your website doesn't appear on Google",
      "Low traffic despite having a website",
      "Competitors ranking above you",
      "No leads from organic search",
      "Poor website structure & SEO setup",
      "Losing visibility to competitors on Google",
    ],
    deliverables: [
      { icon: "Search", title: "SEO Audit & Strategy", items: ["Website audit (technical + content)", "Competitor analysis", "Keyword research (high-intent keywords)", "SEO roadmap & planning"] },
      { icon: "Blocks", title: "On-Page SEO", items: ["Meta titles & descriptions optimization", "Content optimization (keywords + structure)", "Image SEO (alt text, compression)", "Internal linking strategy"] },
      { icon: "Settings", title: "Technical SEO", items: ["Website speed optimization", "Mobile optimization", "Fix crawl & indexing issues", "XML sitemap & robots.txt setup"] },
      { icon: "PenTool", title: "Content Marketing", items: ["SEO blogs & articles", "Keyword-driven content strategy", "Topic clusters & authority building"] },
      { icon: "Link2", title: "Off-Page SEO", items: ["High-quality backlinks", "Directory listings", "Brand mentions"] },
      { icon: "BarChart3", title: "Tracking & Optimization", items: ["Google Analytics & Search Console setup", "Ranking tracking", "Monthly reports & improvements"] },
    ],
    processSteps: [
      { icon: "Search", title: "Audit & Analysis", step: "01" },
      { icon: "Target", title: "Keyword Research", step: "02" },
      { icon: "Blocks", title: "On-Page Optimization", step: "03" },
      { icon: "Settings", title: "Technical Fixes", step: "04" },
      { icon: "Link2", title: "Authority Building", step: "05" },
      { icon: "TrendingUp", title: "Tracking & Scaling", step: "06" },
    ],
    extraSections: [
      { type: "iconGrid", eyebrow: "Where We Optimize", heading: "Platforms We", headingAccent: "Optimize For", items: [{ icon: "Search", title: "Google Search" }, { icon: "MapPin", title: "Google Maps (Local SEO)" }, { icon: "MonitorPlay", title: "YouTube SEO" }, { icon: "ShoppingCart", title: "E-commerce SEO" }] },
      { type: "tags", eyebrow: "High Conversion", heading: "Keywords We Can", headingAccent: "Rank You For", items: ["\"Best digital marketing agency in Nepal\"", "\"SEO services near me\"", "\"Top branding company in Kathmandu\"", "\"Affordable web development Nepal\"", "\"Social media agency Kathmandu\"", "\"Google ads expert Nepal\"", "\"Content marketing services Nepal\"", "\"Lead generation agency Lalitpur\"", "\"Best school in Kathmandu\"", "\"Top restaurant near me\"", "\"Migration consultancy Nepal\"", "\"Money transfer to Nepal\""] },
      { type: "iconGrid", eyebrow: "What To Expect", heading: "Results You Can", headingAccent: "Expect", items: [{ icon: "TrendingUp", text: "Higher Google rankings" }, { icon: "Globe", text: "Increased website traffic" }, { icon: "MessageSquare", text: "More inquiries & leads" }, { icon: "ShoppingCart", text: "Better conversion rates" }, { icon: "DollarSign", text: "Long-term organic growth" }] },
      { type: "tags", eyebrow: "Why Us", heading: "Why", headingAccent: "Brandghar", items: ["Strategy-first SEO (not random keywords)", "Focus on business results, not just traffic", "Deep understanding of Nepal market search behavior", "Complete execution (technical + content + authority)"] },
    ],
    ctaHeading: "Want Your Customers to Find You First?",
    ctaDescription: "Let's get your website ranking at the top and driving real business results.",
    ctaButtonText: "Get Free SEO Audit",
    ctaButtonHref: "/#contact",
    sortOrder: 40,
  },
  {
    id: randomUUID(),
    slug: "brand-identity-graphics-design",
    title: "Brand Identity & Graphics Design",
    eyebrow: "Our Service",
    heading: "Design That Defines Your",
    headingAccent: "Brand.",
    description:
      "We create powerful visual identities that make your brand memorable, consistent, and impossible to ignore.",
    secondaryDescription:
      "Brand Identity is how your business looks, feels, and communicates visually — from logo and colors to typography and design style. It's what makes your brand recognizable and trusted.",
    heroImageUrl: "/medias/illustrations/graphics.jpg",
    icon: "Palette",
    shortDescription:
      "From logos to full brand systems, we create visuals that leave a lasting impression.",
    bullets: ["Logo Design", "Brand Guidelines", "Visual Systems"],
    cardImageUrl: "/medias/services/design.png",
    problems: [
      "Inconsistent brand visuals",
      "Weak or outdated logo",
      "No clear design direction",
      "Designs that don't convert or stand out",
      "Lack of brand recognition",
      "Generic designs that look like competitors",
    ],
    deliverables: [
      { icon: "Brain", title: "Brand Strategy & Direction", items: ["Brand positioning", "Visual direction planning", "Competitor & market analysis"] },
      { icon: "Palette", title: "Logo & Identity Design", items: ["Logo design (primary + variations)", "Color palette & typography", "Iconography & visual elements"] },
      { icon: "BookOpen", title: "Brand Guidelines", items: ["Complete brand book", "Usage rules (logo, colors, fonts)", "Consistency framework"] },
      { icon: "Smartphone", title: "Social Media Design", items: ["Post templates (Reels, carousels, ads)", "Campaign creatives", "Story & highlight designs"] },
      { icon: "Printer", title: "Print & Marketing Materials", items: ["Brochures, flyers, banners", "Business cards & stationery", "Outdoor creatives (hoarding, flex)"] },
      { icon: "Target", title: "Creative Direction", items: ["Design concepts for campaigns", "Visual storytelling", "Ad creative direction"] },
    ],
    processSteps: [
      { icon: "Search", title: "Brand Discovery", step: "01" },
      { icon: "Brain", title: "Concept Development", step: "02" },
      { icon: "PenTool", title: "Design Creation", step: "03" },
      { icon: "RefreshCw", title: "Feedback & Refinement", step: "04" },
      { icon: "FileCheck", title: "Final Delivery & Guidelines", step: "05" },
    ],
    extraSections: [
      { type: "tags", eyebrow: "Deliverables", heading: "What You", headingAccent: "Get", items: ["Logo files (all formats)", "Brand color palette", "Typography system", "Social media templates", "Brand guideline document", "Business card & stationery designs"] },
      { type: "iconGrid", eyebrow: "Who We Work With", heading: "Industries We", headingAccent: "Design For", items: [{ icon: "ShoppingBag", title: "E-commerce Brands" }, { icon: "Sparkles", title: "Beauty & Cosmetics" }, { icon: "Monitor", title: "SaaS & Tech Companies" }, { icon: "Building2", title: "Hotels & Hospitality" }, { icon: "GraduationCap", title: "Education & Training" }] },
      { type: "iconGrid", eyebrow: "What To Expect", heading: "Results You Can", headingAccent: "Expect", items: [{ icon: "Target", text: "Strong brand recognition" }, { icon: "Briefcase", text: "Professional brand image" }, { icon: "TrendingUp", text: "Better engagement & conversions" }, { icon: "Lightbulb", text: "Memorable visual identity" }] },
      { type: "tags", eyebrow: "Why Us", heading: "Why", headingAccent: "Brandghar", items: ["Strategy + design combined", "Modern, premium aesthetics", "Focus on business impact (not just visuals)", "Experience with Nepal market & audience"] },
    ],
    ctaHeading: "Ready to Build a Brand That Stands Out?",
    ctaDescription: "Designs that don't just look good — they perform.",
    ctaButtonText: "Connect with Us",
    ctaButtonHref: "/#contact",
    sortOrder: 50,
  },
  {
    id: randomUUID(),
    slug: "website-development",
    title: "Website Development",
    eyebrow: "Our Service",
    heading: "Build a Website That",
    headingAccent: "Converts.",
    description:
      "We design and develop high-performance websites that not only look premium — but turn visitors into customers.",
    secondaryDescription:
      "Website Design & Development is the process of creating a fast, responsive, and conversion-focused digital platform that represents your brand and drives business growth online.",
    icon: "Code",
    shortDescription:
      "Fast, modern, and conversion-focused websites that look great and perform even better.",
    bullets: ["Custom Websites", "Responsive Design", "Performance Optimized"],
    cardImageUrl: "/medias/services/website.png",
    problems: [
      "Outdated or unattractive website",
      "Slow loading speed",
      "Not mobile-friendly",
      "No conversions or inquiries",
      "Poor user experience (UX)",
      "Hard to update or manage content",
    ],
    deliverables: [
      { icon: "Palette", title: "UI/UX Design", items: ["Modern, clean interface design", "User journey & conversion flow", "Wireframes & prototypes"] },
      { icon: "Code", title: "Website Development", items: ["Custom website development", "Landing pages & business websites", "E-commerce websites"] },
      { icon: "Zap", title: "Performance Optimization", items: ["Fast loading speed", "Mobile responsiveness", "SEO-friendly structure"] },
      { icon: "Link2", title: "Integrations", items: ["Payment gateways", "Forms & CRM integration", "Analytics tools"] },
      { icon: "Settings", title: "CMS & Management", items: ["WordPress / custom CMS", "Easy content management", "Training & support"] },
      { icon: "ShieldCheck", title: "Security & Maintenance", items: ["SSL & security setup", "Regular updates", "Ongoing support"] },
    ],
    processSteps: [
      { icon: "Search", title: "Requirement & Research", step: "01" },
      { icon: "Brain", title: "Planning & Wireframing", step: "02" },
      { icon: "PenTool", title: "UI/UX Design", step: "03" },
      { icon: "Code", title: "Development", step: "04" },
      { icon: "Rocket", title: "Testing & Launch", step: "05" },
      { icon: "TrendingUp", title: "Optimization & Support", step: "06" },
    ],
    extraSections: [
      { type: "iconGrid", eyebrow: "What We Build", heading: "Types of", headingAccent: "Websites", items: [{ icon: "Building2", title: "Business / Corporate Websites" }, { icon: "ShoppingCart", title: "E-commerce Websites" }, { icon: "FileText", title: "Landing Pages" }, { icon: "GraduationCap", title: "Educational Platforms" }, { icon: "Briefcase", title: "Portfolio Websites" }] },
      { type: "tags", eyebrow: "Built-In Features", heading: "Features Your Website", headingAccent: "Will Have", items: ["Mobile responsive design", "SEO-ready structure", "Fast loading speed", "Conversion-focused layout", "Easy-to-manage backend"] },
      { type: "iconGrid", eyebrow: "What To Expect", heading: "Results You Can", headingAccent: "Expect", items: [{ icon: "TrendingUp", text: "More website visitors" }, { icon: "MessageSquare", text: "Increased inquiries & leads" }, { icon: "ShoppingCart", text: "Higher conversion rates" }, { icon: "Zap", text: "Faster & smoother user experience" }, { icon: "Monitor", text: "Strong online presence" }] },
      { type: "tags", eyebrow: "Why Us", heading: "Why", headingAccent: "Brandghar", items: ["Design + marketing mindset combined", "Focus on conversion, not just design", "Clean, premium UI standards", "Experience across industries in Nepal"] },
    ],
    ctaHeading: "Ready to Build a Website That Grows Your Business?",
    ctaDescription: "Websites that don't just look good — they perform.",
    ctaButtonText: "Get Your Website",
    ctaButtonHref: "/#contact",
    sortOrder: 60,
  },
];

async function main() {
  console.log("→ seeding services…");
  for (const s of SERVICES) {
    await db.insert(schema.services).values(s).onConflictDoNothing();
  }
  console.log(`✓ ${SERVICES.length} services seeded`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
