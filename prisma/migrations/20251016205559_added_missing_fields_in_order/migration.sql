/*
  Warnings:

  - Added the required column `city` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_number` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "street_number" TEXT NOT NULL;
