CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"eyebrow" text DEFAULT 'Our Service' NOT NULL,
	"heading" text NOT NULL,
	"heading_accent" text NOT NULL,
	"description" text NOT NULL,
	"secondary_description" text,
	"hero_image_url" text,
	"icon" text DEFAULT 'Briefcase' NOT NULL,
	"short_description" text NOT NULL,
	"bullets" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"card_image_url" text,
	"problems" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"deliverables" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"process_steps" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"extra_sections" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cta_heading" text NOT NULL,
	"cta_description" text,
	"cta_button_text" text DEFAULT 'Connect with Us' NOT NULL,
	"cta_button_href" text DEFAULT '/#contact' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "services_sort_idx" ON "services" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX "services_active_idx" ON "services" USING btree ("is_active");