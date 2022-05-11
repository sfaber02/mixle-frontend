DROP DATABASE IF EXISTS tbd_player;
CREATE DATABASE tbd_player;

/c tbd_player;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL
);

-- do we need to save length and size or can we get that from the blob?
CREATE TABLE audio (
    audio_id SERIAL PRIMARY KEY,
    title VARCHAR,
    artist VARCHAR,
    album VARCHAR,
    audio_gd_key VARCHAR,
    length INTEGER,
    size INTEGER,
    user INTEGER REFERENCES users (user_id) ON DELETE CASCADE
);

-- @Shawn -> what effects are avaliable / we want to use from the web audio api?
CREATE TABLE effects (
    audio INTEGER REFERENCES audio (audio_id) ON DELETE CASCADE
);