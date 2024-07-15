

DROP DATABASE IF EXISTS tuners_dev;

CREATE DATABASE tuners_dev;

\c tuners_dev;

CREATE TABLE tuners (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN
);