CREATE TABLE `core_values` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` text DEFAULT 'Target' NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `core_values_sort_idx` ON `core_values` (`sort_order`);--> statement-breakpoint
CREATE INDEX `core_values_active_idx` ON `core_values` (`is_active`);--> statement-breakpoint
CREATE TABLE `mission_vision_page` (
	`id` text PRIMARY KEY NOT NULL,
	`mission_text` text NOT NULL,
	`vision_text` text NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `our_company_clients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`logo_url` text,
	`website_url` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `our_company_clients_sort_idx` ON `our_company_clients` (`sort_order`);--> statement-breakpoint
CREATE INDEX `our_company_clients_active_idx` ON `our_company_clients` (`is_active`);--> statement-breakpoint
CREATE TABLE `our_company_page` (
	`id` text PRIMARY KEY NOT NULL,
	`story_eyebrow` text DEFAULT 'Our Story' NOT NULL,
	`story_heading` text NOT NULL,
	`story_heading_accent` text NOT NULL,
	`story_body` text NOT NULL,
	`est_year` text DEFAULT '2025' NOT NULL,
	`story_image_url` text,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
