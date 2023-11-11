DROP TABLE IF EXISTS "todos";

CREATE TABLE "todos" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"isComplete" BOOLEAN DEFAULT FALSE,
	"completedAt" TIMESTAMPTZ DEFAULT NULL
);

INSERT INTO "todos"
  ("text")
  VALUES 
  ('Build a CRUD app'),
  ('Make my app look nice');

-- SQL code for GET route
SELECT * FROM "todos" 
  ORDER BY "id";

-- SQL code for POST route
INSERT INTO "todos" 
  ("text")
  VALUES 
  ($1);

-- SQL code for DELETE route
DELETE FROM "todos" 
  WHERE "id" = $1;

-- SQL code for PUT route
-- If item is marked completed
UPDATE "todos" 
    SET "isComplete" = true, 
        "completedAt" = NOW()
    WHERE "id" = $1;

-- If completed item is marked uncompleted
UPDATE "todos" 
    SET "isComplete" = false, 
        "completedAt" = NULL
    WHERE "id" = $1;
