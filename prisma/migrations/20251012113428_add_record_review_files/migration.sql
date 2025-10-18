-- CreateTable
CREATE TABLE "records" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist" (
    "user_id" INTEGER NOT NULL,
    "record_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "RecordReview" (
    "reviewId" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "record_id" INTEGER NOT NULL,
    "comment" TEXT,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordReview_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_files" (
    "file_id" TEXT NOT NULL,
    "record_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_user_id_record_id_key" ON "wishlist"("user_id", "record_id");

-- CreateIndex
CREATE UNIQUE INDEX "record_files_file_id_record_id_key" ON "record_files"("file_id", "record_id");

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordReview" ADD CONSTRAINT "RecordReview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordReview" ADD CONSTRAINT "RecordReview_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_files" ADD CONSTRAINT "record_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "record_files" ADD CONSTRAINT "record_files_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
