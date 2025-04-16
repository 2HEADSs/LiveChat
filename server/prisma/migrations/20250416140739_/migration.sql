/*
  Warnings:

  - Added the required column `ownerId` to the `chat_rooms` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `chat_rooms` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "chat_rooms" ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "chat_rooms" ADD CONSTRAINT "chat_rooms_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
