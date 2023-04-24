-- Variables column creation
do $$
BEGIN
    IF EXISTS (SELECT FROM "migration_version" 
                WHERE  "version" = 3) THEN
        RAISE NOTICE 'Version 3 migration already executed.';
    ELSE

        CREATE TABLE "games" (
            id SERIAL PRIMARY KEY,
            type VARCHAR(32), -- One of "ai" | "online" | "local"
            status VARCHAR(32), -- One of <"in-progress", "complete">
            board JSONB,
            settings JSONB, -- contains boardSize, aiDifficulty, localPlayerNames
            whose_turn VARCHAR(100)
        );

        ALTER TABLE public.invites ADD COLUMN "game_id" INT;
        INSERT INTO "migration_version" ("description") VALUES ('adding table for games');
    END IF;
END
$$