CREATE TABLE `blog_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_categories_name_unique` ON `blog_categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_categories_slug_unique` ON `blog_categories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_categories_name_idx` ON `blog_categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_categories_slug_idx` ON `blog_categories` (`slug`);--> statement-breakpoint
CREATE INDEX `blog_categories_sort_idx` ON `blog_categories` (`sort_order`);