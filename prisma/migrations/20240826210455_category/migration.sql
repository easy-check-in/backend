/*
  Warnings:

  - The primary key for the `rooms` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `capacity` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `extraPersonCharge` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `hotels` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_roomId_fkey";

-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "roomId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_pkey",
DROP COLUMN "capacity",
DROP COLUMN "extraPersonCharge",
DROP COLUMN "price",
ADD COLUMN     "categoryId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "rooms_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "rooms_id_seq";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "extraPersonCharge" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "_createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hotels_accountId_key" ON "hotels"("accountId");

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
