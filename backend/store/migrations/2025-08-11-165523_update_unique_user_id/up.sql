-- Your SQL goes here

-- AddUniqueConstrant
ALTER TABLE "user"
ADD CONSTRAINT "u_id" UNIQUE(username);