\c mixle;

INSERT INTO users (username, email, password) VALUES (
    'capstone3', 'capstone@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96' 
);

INSERT INTO audio (title, artist, album, audio_key) VALUES
    ('Money', 'Pink Floyd', 'The Darkside of the Moon', '(6)%20Pink%20Floyd%20-%20Money.flac'),
    ('Glue of the World', 'Four Tet', 'Pause', '01%20-%20Glue%20of%20the%20World.flac'),
    ('Loved', 'Levitation Room', 'Ethos', '01%20-%20Loved.mp3'),
    ('Metronomic Underground', 'Stereolab', 'Emperor Tomato Ketchup', '01%20-%20Metronomic%20Underground%20-%20USEE19694710%20-%20355425551.flac'),
    ('Packt Like Sardines', 'Radiohead', 'Amnesiac', '01%20Packt%20Like%20Sardines%20In%20A%20Crushd%20Tin%20Box.flac'),
    ('The Chain', 'Fleetwood Mac', 'Rumours', '1-08%20-%20The%20Chain.flac'),
    ('Cermeony', 'New Order', 'Movement', '101%20-%20New%20Order%20-%20Ceremony.flac'),
    ('Tomorrow Never Knows', 'The Beatles', 'Revolver', 'B5%20Tomorrow%20Never%20Knows.mp3'),
    ('The Beat Tape VANO 3000', 'VANO 3000', 'The Beat Tape', 'The%20Beat%20Tape%20VANO%203000.mp4');
 
-- INSERT INTO effects (eq_band_1, eq_band_2, eq_band_3, eq_band_4, eq_band_5, compressor_attack, compressor_release, compressor_ratio, compressor_threshold, delay_time, delay_feedback, play_speed, audio, user_id) VALUES
-- ();