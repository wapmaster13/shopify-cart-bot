-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" DATETIME,
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "GiftRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "triggerType" TEXT NOT NULL,
    "triggerProductIds" TEXT NOT NULL,
    "minCartValue" REAL NOT NULL,
    "minQuantity" INTEGER NOT NULL,
    "maxQuantity" INTEGER NOT NULL,
    "replaceTriggerItems" BOOLEAN NOT NULL,
    "giftVariantId" TEXT,
    "giftVariantIds" TEXT NOT NULL,
    "applyIfAlreadyInCart" BOOLEAN NOT NULL,
    "requireConsent" BOOLEAN NOT NULL,
    "oncePerSession" BOOLEAN NOT NULL,
    "reverseLogic" BOOLEAN NOT NULL,
    "ajaxOnly" BOOLEAN NOT NULL,
    "applyForEachCondition" BOOLEAN NOT NULL,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
