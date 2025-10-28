-- DropForeignKey
ALTER TABLE "public"."record_files" DROP CONSTRAINT "record_files_file_id_fkey";

-- AddForeignKey
ALTER TABLE "record_files" ADD CONSTRAINT "record_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;
