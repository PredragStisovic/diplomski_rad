/*
  Warnings:

  - You are about to drop the `RecordReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."RecordReview" DROP CONSTRAINT "RecordReview_record_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."RecordReview" DROP CONSTRAINT "RecordReview_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."wishlist" DROP CONSTRAINT "wishlist_record_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."wishlist" DROP CONSTRAINT "wishlist_user_id_fkey";

-- DropTable
DROP TABLE "public"."RecordReview";

-- DropTable
DROP TABLE "public"."wishlist";

-- CreateTable
CREATE TABLE "wishlists" (
    "user_id" INTEGER NOT NULL,
    "record_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "record_reviews" (
    "reviewId" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "record_id" INTEGER NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "record_reviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateIndex
CREATE UNIQUE INDEX "wishlists_user_id_record_id_key" ON "wishlists"("user_id", "record_id");

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlists" ADD CONSTRAINT "wishlists_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_reviews" ADD CONSTRAINT "record_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_reviews" ADD CONSTRAINT "record_reviews_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
