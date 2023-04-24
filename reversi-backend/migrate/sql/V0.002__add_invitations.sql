-- Variables column creation
do $$
BEGIN
    IF EXISTS (SELECT FROM "migration_version" 
                WHERE  "version" = 2) THEN
        RAISE NOTICE 'Version 2 migration already executed.';
    ELSE

        -- CREATE TABLE "games" (
        --     id SERIAL PRIMARY KEY,
        --     type VARCHAR(32)
        --     status VARCHAR(32) -- One of <"in-progress", "complete">
        --     board JSONB,
        --     settings JSONB, -- contains boardSize, aiDifficulty, localPlayerNames
        --     whose_turn VARCHAR(32) -- one of "black" or "white"
        --     winner_username VARCHAR(100), -- only set for online games? (do other games count towards ELO?)
        --     winning_score INT, -- only set when game is over
        --     created_by VARCHAR(256),
        --     created_at timestamp without time zone DEFAULT now() NOT NULL,
        -- )

        CREATE TABLE "invites" (
            id SERIAL PRIMARY KEY,
            created_at timestamp without time zone DEFAULT now() NOT NULL,
            sent_by VARCHAR(100) REFERENCES users(username), -- foreign key to players
            sent_to VARCHAR(100) REFERENCES users(username), -- foreign key to players
            game_settings jsonb, -- contains boardSize, color of sender
            status VARCHAR(32) -- should be one of <"pending", "accepted", "declined">
        );

        INSERT INTO "migration_version" ("description") VALUES ('adding tables for game invites');
    END IF;
END
$$