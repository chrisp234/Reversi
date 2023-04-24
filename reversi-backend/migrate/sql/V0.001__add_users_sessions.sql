-- Initial schema creation
do $$
BEGIN
    IF EXISTS (SELECT FROM "information_schema"."tables" 
                WHERE  "table_schema" = 'public'
                AND    "table_name"  = 'migration_version') THEN
        RAISE NOTICE 'Version 1 migration already executed.';
    ELSE
        CREATE TABLE "migration_version" (
            "version" SMALLINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            "description" VARCHAR(32) NOT NULL
        );

        CREATE TABLE "users" (
            username VARCHAR(100) PRIMARY KEY,
            password VARCHAR(256), -- application enforces required for non-guest
            is_guest BOOLEAN DEFAULT FALSE
        );

        CREATE TABLE "sessions" (
            username VARCHAR(100) REFERENCES users(username),
            active_session_token VARCHAR(256) UNIQUE
        );

        INSERT INTO "migration_version" ("description") VALUES ('initial creation');
    END IF;
END
$$