-- Variables column creation
do $$
BEGIN
    IF EXISTS (SELECT FROM "migration_version" 
                WHERE  "version" = 4) THEN
        RAISE NOTICE 'Version 4 migration already executed.';
    ELSE


        ALTER TABLE public.users ADD COLUMN "elo" INT DEFAULT 1500;
        INSERT INTO "migration_version" ("description") VALUES ('adding elo to users table');
    END IF;
END
$$