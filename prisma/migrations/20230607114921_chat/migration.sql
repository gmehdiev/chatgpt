-- CreateTable
CREATE TABLE "chat" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUuid" TEXT,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "message" (
    "uuid" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatUuid" TEXT,

    CONSTRAINT "message_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatUuid_fkey" FOREIGN KEY ("chatUuid") REFERENCES "chat"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
