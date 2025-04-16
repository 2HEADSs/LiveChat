/*
  Warnings:

  - Added the required column `inviterId` to the `chat_room_invites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_room_invites" ADD COLUMN     "inviterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chat_room_invites" ADD CONSTRAINT "chat_room_invites_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
