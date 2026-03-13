-- Migration: add custom answers to bookings

ALTER TABLE `bookings` ADD COLUMN `custom_answers` JSON NULL;
