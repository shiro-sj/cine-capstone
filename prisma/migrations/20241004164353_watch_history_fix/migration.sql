/*
  Warnings:

  - You are about to drop the column `clerkId` on the `WatchHistory` table. All the data in the column will be lost.
  - Added the required column `userId` to the `WatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WatchHistory" DROP CONSTRAINT "WatchHistory_clerkId_fkey";

-- AlterTable
ALTER TABLE "WatchHistory" DROP COLUMN "clerkId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
