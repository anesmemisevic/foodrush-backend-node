/*
  Warnings:

  - You are about to drop the column `order_id` on the `OrderDetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "order_detail_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "order_id";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_order_detail_id_fkey" FOREIGN KEY ("order_detail_id") REFERENCES "OrderDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
