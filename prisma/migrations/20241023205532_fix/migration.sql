/*
  Warnings:

  - You are about to drop the column `receiverId` on the `FriendRequests` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `FriendRequests` table. All the data in the column will be lost.
  - Added the required column `receiverUserName` to the `FriendRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUserName` to the `FriendRequests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FriendRequests" DROP CONSTRAINT "FriendRequests_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequests" DROP CONSTRAINT "FriendRequests_senderId_fkey";

-- AlterTable
ALTER TABLE "FriendRequests" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "receiverUserName" TEXT NOT NULL,
ADD COLUMN     "senderUserName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FriendRequests" ADD CONSTRAINT "FriendRequests_senderUserName_fkey" FOREIGN KEY ("senderUserName") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequests" ADD CONSTRAINT "FriendRequests_receiverUserName_fkey" FOREIGN KEY ("receiverUserName") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
