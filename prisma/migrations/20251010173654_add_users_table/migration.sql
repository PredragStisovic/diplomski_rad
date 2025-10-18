-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('Admin', 'Customer', 'Worker');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "role" "RoleEnum" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
