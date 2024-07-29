

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
    rating INT (rating >= 1 AND rating <= 10),
    play_count INT DEFAULT 0,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    reviewer_name VARCHAR(100),
    review_text TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tuner_id INT REFERENCES tuners(id) ON DELETE CASCADE
);