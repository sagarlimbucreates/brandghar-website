CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`service` text,
	`message` text,
	`source` text DEFAULT 'hero_landing' NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`read_at` integer,
	`read_by` text,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`read_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `leads_is_read_idx` ON `leads` (`is_read`);--> statement-breakpoint
CREATE INDEX `leads_created_idx` ON `leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `leads_source_idx` ON `leads` (`source`);