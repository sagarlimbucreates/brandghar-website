CREATE TABLE `contact_page` (
	`id` text PRIMARY KEY NOT NULL,
	`hero_eyebrow` text DEFAULT 'Get In Touch' NOT NULL,
	`hero_heading` text NOT NULL,
	`hero_heading_accent` text NOT NULL,
	`hero_subtitle` text NOT NULL,
	`phone_number` text NOT NULL,
	`phone_hours` text,
	`location_label` text NOT NULL,
	`location_url` text,
	`email_address` text NOT NULL,
	`email_reply_note` text,
	`map_embed_url` text,
	`instagram_url` text,
	`facebook_url` text,
	`tiktok_url` text,
	`linkedin_url` text,
	`quick_help_heading` text DEFAULT 'Need Immediate Help?' NOT NULL,
	`whatsapp_url` text,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `contact_trust_points` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`icon` text DEFAULT 'Users' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `contact_trust_points_sort_idx` ON `contact_trust_points` (`sort_order`);--> statement-breakpoint
CREATE INDEX `contact_trust_points_active_idx` ON `contact_trust_points` (`is_active`);