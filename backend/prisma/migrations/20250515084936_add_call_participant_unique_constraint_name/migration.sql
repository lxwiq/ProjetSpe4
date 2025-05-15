/*
  Warnings:

  - You are about to drop the `document_invitations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "document_invitations" DROP CONSTRAINT "document_invitations_document_id_fkey";

-- DropForeignKey
ALTER TABLE "document_invitations" DROP CONSTRAINT "document_invitations_invited_by_fkey";

-- DropForeignKey
ALTER TABLE "document_invitations" DROP CONSTRAINT "document_invitations_user_id_fkey";

-- DropTable
DROP TABLE "document_invitations";
