DROP DATABASE IF EXISTS mixle;
CREATE DATABASE mixle;

/c mixle;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    avaliableVotes INTEGER DEFAULT 3
);

CREATE TABLE audio (
    audio_id SERIAL PRIMARY KEY,
    title VARCHAR,
    artist VARCHAR,
    album VARCHAR,
    audio_key VARCHAR,
    user INTEGER REFERENCES users (user_id) ON DELETE CASCADE,
    totalVotes INTEGER
);

CREATE TABLE effects (
    effects_id SERIAL PRIMARY KEY,
    eq_band_1 INTEGER,
    eq_band_2 INTEGER,
    eq_band_3 INTEGER,
    eq_band_4 INTEGER,
    eq_band_5 INTEGER,
    compressor_attack INTEGER,
    compressor_release INTEGER,
    compressor_ratio INTEGER,
    compressor_threshold INTEGER,
    delay_time INTEGER,
    delay_feedback INTEGER ,
    play_speed INTEGER,
    audio INTEGER REFERENCES audio (audio_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE
);