\c tuners_dev

INSERT INTO tuners (name, artist, album, time, is_favorite, genre, release_date, rating, play_count, added_date) VALUES
('Training Season', 'Dua Lipa', 'Radical Optimism', '3:30', true, 'Pop', '2024-07-29', 5, 10, CURRENT_TIMESTAMP),
('Cozy', 'Beyoncé', 'Renaissance', '3:27', true, 'Pop', '2022-07-29', 4, 15, CURRENT_TIMESTAMP),
('Boss Bitch', 'Doja Cat', 'Birds of Prey', '2:58', true, 'Hip Hop', '2020-02-07', 5, 20, CURRENT_TIMESTAMP),
('Body', 'Megan Thee Stallion', 'Good News', '2:53', true, 'Hip Hop', '2020-11-20', 5, 25, CURRENT_TIMESTAMP);


INSERT INTO reviews (reviewer_name, review_text, rating, tuner_id, review_date)
VALUES
('Alice', 'Amazing track with a strong vibe!', 5, 1, CURRENT_TIMESTAMP), 
('Bob', 'Energetic and empowering. Love it!', 4, 2, CURRENT_TIMESTAMP), 
('Charlie', 'A catchy song with great beats.', 5, 3, CURRENT_TIMESTAMP),
('Aaron', 'Ahh.....Ahh....Ahh...Amazing!', 5,4, CURRENT_TIMESTAMP);