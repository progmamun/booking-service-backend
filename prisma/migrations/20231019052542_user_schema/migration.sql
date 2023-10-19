-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superadmin', 'admin', 'customer');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT 'customer',
    "contactNo" TEXT,
    "address" TEXT,
    "profileImg" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
