/*
  Warnings:

  - You are about to drop the column `postURL` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Comment_userID_postID_key";

-- DropIndex
DROP INDEX "Follow_followerID_followingID_key";

-- DropIndex
DROP INDEX "Post_userID_postURL_postID_key";

-- DropIndex
DROP INDEX "Reaction_userID_postID_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postURL";
