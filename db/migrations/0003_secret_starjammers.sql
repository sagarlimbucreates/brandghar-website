CREATE TABLE `team_members` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`role` text NOT NULL,
	`bio` text,
	`photo_url` text,
	`linkedin_url` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `team_members_sort_idx` ON `team_members` (`sort_order`);--> statement-breakpoint
CREATE INDEX `team_members_active_idx` ON `team_members` (`is_active`);