ALTER TABLE `menus` ADD `parent_id` text;--> statement-breakpoint
CREATE INDEX `menus_parent_idx` ON `menus` (`parent_id`);