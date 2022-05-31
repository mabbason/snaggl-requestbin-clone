CREATE TABLE bins (
  id serial PRIMARY KEY,
  url text NOT NULL UNIQUE,
  created_at timestamp NOT NULL
);

CREATE TABLE requests (
  id serial PRIMARY KEY,
  content_type varchar,
  content_length numeric,
  received_at timestamp,
  ip_from varchar,
  method varchar,
  headers jsonb,
  bin_id integer
    NOT NULL
    REFERENCES bins (id)
    ON DELETE CASCADE
);