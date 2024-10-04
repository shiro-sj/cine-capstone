/*
  Warnings:

  - You are about to drop the column `userId` on the `WatchHistory` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `WatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WatchHistory" DROP CONSTRAINT "WatchHistory_userId_fkey";

-- AlterTable
ALTER TABLE "WatchHistory" DROP COLUMN "userId",
ADD COLUMN     "clerkId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "WatchHistory" ADD CONSTRAINT "WatchHistory_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
