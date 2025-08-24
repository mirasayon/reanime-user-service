-- CreateEnum
CREATE TYPE "public"."AnimeStatus" AS ENUM ('WATCHING', 'ABANDONED', 'PLANNED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."AccountType" AS ENUM ('USER', 'ADMIN', 'MODERATOR', 'DEVELOPER', 'TESTER');

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "type" "public"."AccountType" NOT NULL DEFAULT 'USER',
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "is_activated" BOOLEAN NOT NULL DEFAULT false,
    "activation_link" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "token" VARCHAR(577) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "expires_at" TIMESTAMPTZ,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "by_account_id" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "avatar_url_hash" TEXT,
    "cover_url_hash" TEXT,
    "bio" TEXT,
    "by_account_id" TEXT NOT NULL,
    "nickname" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MarkedAnimeCollection" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "profile_id" TEXT NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "status" "public"."AnimeStatus" NOT NULL,

    CONSTRAINT "MarkedAnimeCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AnimeFavorite" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "profile_id" TEXT NOT NULL,
    "anime_id" INTEGER NOT NULL,
    "vote" BOOLEAN NOT NULL,

    CONSTRAINT "AnimeFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reply" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "content" TEXT NOT NULL,
    "by_profile_id" TEXT NOT NULL,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "to_comment_id" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "content" TEXT NOT NULL,
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "by_profile_id" TEXT NOT NULL,
    "anime_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CommentVote" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "by_profile_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,
    "vote" BOOLEAN NOT NULL,

    CONSTRAINT "CommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReplyVote" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "by_profile_id" TEXT NOT NULL,
    "reply_id" TEXT NOT NULL,
    "vote" BOOLEAN NOT NULL,

    CONSTRAINT "ReplyVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "public"."Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_username_key" ON "public"."Account"("username");

-- CreateIndex
CREATE INDEX "Account_email_idx" ON "public"."Account"("email");

-- CreateIndex
CREATE INDEX "Account_username_idx" ON "public"."Account"("username");

-- CreateIndex
CREATE INDEX "Account_type_idx" ON "public"."Account"("type");

-- CreateIndex
CREATE INDEX "Account_is_activated_idx" ON "public"."Account"("is_activated");

-- CreateIndex
CREATE INDEX "Account_activation_link_idx" ON "public"."Account"("activation_link");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "public"."Session"("token");

-- CreateIndex
CREATE INDEX "Session_by_account_id_idx" ON "public"."Session"("by_account_id");

-- CreateIndex
CREATE INDEX "Session_ip_address_idx" ON "public"."Session"("ip_address");

-- CreateIndex
CREATE INDEX "Session_user_agent_idx" ON "public"."Session"("user_agent");

-- CreateIndex
CREATE INDEX "Session_expires_at_idx" ON "public"."Session"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_by_account_id_key" ON "public"."Profile"("by_account_id");

-- CreateIndex
CREATE INDEX "MarkedAnimeCollection_profile_id_idx" ON "public"."MarkedAnimeCollection"("profile_id");

-- CreateIndex
CREATE INDEX "MarkedAnimeCollection_anime_id_idx" ON "public"."MarkedAnimeCollection"("anime_id");

-- CreateIndex
CREATE INDEX "MarkedAnimeCollection_status_idx" ON "public"."MarkedAnimeCollection"("status");

-- CreateIndex
CREATE UNIQUE INDEX "MarkedAnimeCollection_profile_id_anime_id_key" ON "public"."MarkedAnimeCollection"("profile_id", "anime_id");

-- CreateIndex
CREATE INDEX "AnimeFavorite_profile_id_idx" ON "public"."AnimeFavorite"("profile_id");

-- CreateIndex
CREATE INDEX "AnimeFavorite_anime_id_idx" ON "public"."AnimeFavorite"("anime_id");

-- CreateIndex
CREATE INDEX "AnimeFavorite_vote_idx" ON "public"."AnimeFavorite"("vote");

-- CreateIndex
CREATE UNIQUE INDEX "AnimeFavorite_profile_id_anime_id_key" ON "public"."AnimeFavorite"("profile_id", "anime_id");

-- CreateIndex
CREATE INDEX "Comment_anime_id_idx" ON "public"."Comment"("anime_id");

-- CreateIndex
CREATE INDEX "CommentVote_comment_id_idx" ON "public"."CommentVote"("comment_id");

-- CreateIndex
CREATE INDEX "CommentVote_by_profile_id_idx" ON "public"."CommentVote"("by_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "CommentVote_by_profile_id_comment_id_key" ON "public"."CommentVote"("by_profile_id", "comment_id");

-- CreateIndex
CREATE INDEX "ReplyVote_reply_id_idx" ON "public"."ReplyVote"("reply_id");

-- CreateIndex
CREATE INDEX "ReplyVote_by_profile_id_idx" ON "public"."ReplyVote"("by_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReplyVote_by_profile_id_reply_id_key" ON "public"."ReplyVote"("by_profile_id", "reply_id");

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_by_account_id_fkey" FOREIGN KEY ("by_account_id") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_by_account_id_fkey" FOREIGN KEY ("by_account_id") REFERENCES "public"."Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MarkedAnimeCollection" ADD CONSTRAINT "MarkedAnimeCollection_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AnimeFavorite" ADD CONSTRAINT "AnimeFavorite_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_by_profile_id_fkey" FOREIGN KEY ("by_profile_id") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_to_comment_id_fkey" FOREIGN KEY ("to_comment_id") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comment" ADD CONSTRAINT "Comment_by_profile_id_fkey" FOREIGN KEY ("by_profile_id") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommentVote" ADD CONSTRAINT "CommentVote_by_profile_id_fkey" FOREIGN KEY ("by_profile_id") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CommentVote" ADD CONSTRAINT "CommentVote_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "public"."Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReplyVote" ADD CONSTRAINT "ReplyVote_by_profile_id_fkey" FOREIGN KEY ("by_profile_id") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReplyVote" ADD CONSTRAINT "ReplyVote_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "public"."Reply"("id") ON DELETE CASCADE ON UPDATE CASCADE;
