/*
  Warnings:

  - You are about to drop the column `private` on the `files` table. All the data in the column will be lost.
  - Added the required column `artist` to the `records` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('Pending', 'OnHold', 'Processing', 'Shipped', 'InTransit', 'Completed');

-- AlterTable
ALTER TABLE "files" DROP COLUMN "private";

-- AlterTable
ALTER TABLE "records" ADD COLUMN     "artist" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "record_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "order_items_record_id_order_id_key" ON "order_items"("record_id", "order_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
