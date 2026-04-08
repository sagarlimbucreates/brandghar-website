CREATE TABLE `menus` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`label` text NOT NULL,
	`href` text NOT NULL,
	`icon` text NOT NULL,
	`required_group` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `menus_key_unique` ON `menus` (`key`);--> statement-breakpoint
CREATE INDEX `menus_sort_idx` ON `menus` (`sort_order`);--> statement-breakpoint
CREATE INDEX `menus_active_idx` ON `menus` (`is_active`);