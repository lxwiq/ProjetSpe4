/*
  Warnings:

  - You are about to alter the column `change_summary` on the `document_versions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - Made the column `modification_date` on table `document_versions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_folder` on table `documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_deleted` on table `documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `auto_save_interval` on table `documents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "document_versions" ADD COLUMN     "file_path" VARCHAR(500),
ADD COLUMN     "file_size" BIGINT,
ADD COLUMN     "file_type" VARCHAR(50),
ADD COLUMN     "is_major_version" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" VARCHAR(255),
ALTER COLUMN "modification_date" SET NOT NULL,
ALTER COLUMN "change_summary" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "allow_comments" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" VARCHAR(500),
ADD COLUMN     "file_extension" VARCHAR(20),
ADD COLUMN     "file_name" VARCHAR(255),
ADD COLUMN     "file_original_name" VARCHAR(255),
ADD COLUMN     "file_upload_date" TIMESTAMPTZ(6),
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_template" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_accessed_at" TIMESTAMPTZ(6),
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "tags" VARCHAR(500),
ALTER COLUMN "is_folder" SET NOT NULL,
ALTER COLUMN "is_deleted" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "auto_save_interval" SET NOT NULL;

-- CreateIndex
CREATE INDEX "idx_document_versions_modified_by" ON "document_versions"("modified_by");

-- CreateIndex
CREATE INDEX "idx_document_versions_modification_date" ON "document_versions"("modification_date");

-- CreateIndex
CREATE INDEX "idx_documents_title" ON "documents"("title");

-- CreateIndex
CREATE INDEX "idx_documents_file_type" ON "documents"("file_type");

-- CreateIndex
CREATE INDEX "idx_documents_created_at" ON "documents"("created_at");

-- CreateIndex
CREATE INDEX "idx_documents_updated_at" ON "documents"("updated_at");

-- CreateIndex
CREATE INDEX "idx_documents_is_folder" ON "documents"("is_folder");
