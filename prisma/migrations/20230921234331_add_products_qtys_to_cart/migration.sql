-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "productsQuantities" JSONB[] DEFAULT ARRAY[]::JSONB[];
