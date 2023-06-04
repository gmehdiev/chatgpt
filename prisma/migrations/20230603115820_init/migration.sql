/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "token_refreshToken_key" ON "token"("refreshToken");
