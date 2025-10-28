-- DropForeignKey
ALTER TABLE "public"."record_files" DROP CONSTRAINT "record_files_record_id_fkey";

-- AddForeignKey
ALTER TABLE "record_files" ADD CONSTRAINT "record_files_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "records"("id") ON DELETE CASCADE ON UPDATE CASCADE;
