CREATE TABLE IF NOT EXISTS products (
    id bigserial PRIMARY KEY,
    created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
    name text NOT NULL,
    description text NOT NULL,
    imageURL text,
    seller text NOT NULL
    categories text[] NOT NULL,
    );