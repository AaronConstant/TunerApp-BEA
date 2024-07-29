

DROP DATABASE IF EXISTS tuners_dev;

CREATE DATABASE tuners_dev;

\c tuners_dev;

CREATE TABLE tuners (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN,
    genre VARCHAR(50),
    release_date DATE,
    rating INT,
    play_count INT DEFAULT 0,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);