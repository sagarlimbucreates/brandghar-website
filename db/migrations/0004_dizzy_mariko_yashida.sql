CREATE TABLE `blog_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`category` text NOT NULL,
	`cover_image_url` text,
	`author` text,
	`read_time_minutes` integer DEFAULT 5 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`is_featured` integer DEFAULT false NOT NULL,
	`published_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_idx` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `blog_posts_status_idx` ON `blog_posts` (`status`);--> statement-breakpoint
CREATE INDEX `blog_posts_featured_idx` ON `blog_posts` (`is_featured`);--> statement-breakpoint
CREATE INDEX `blog_posts_published_idx` ON `blog_posts` (`published_at`);--> statement-breakpoint
CREATE INDEX `blog_posts_category_idx` ON `blog_posts` (`category`);