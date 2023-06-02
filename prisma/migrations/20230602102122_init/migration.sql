-- CreateTable
CREATE TABLE "user" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "activationLink" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "token" (
    "uuid" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_password_key" ON "user"("password");

-- CreateIndex
CREATE UNIQUE INDEX "token_userUuid_key" ON "token"("userUuid");

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
