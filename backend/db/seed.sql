\c mixle;

INSERT INTO users (username, email, password) VALUES (
    ('capstone3', 'capstone@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('shawn', 'shawn@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('hector', 'hector@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('james', 'james@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('josh', 'josh@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('test1', 'test1@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('test2', 'test2@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('test3', 'test3@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('test4', 'test4@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('test5', 'test5@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'),
    ('test6', 'test6@gmail.com', '$2b$10$jSK3gK28fB7bTi5/S89AUuOwiJloAmxz2eiNNBA8AOHNRIOtGtB96'); 
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
 
INSERT INTO effects (effects_data, audio, user_id) VALUES
('{"speed":{"rate":0.5,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":1,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":2,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":1.5,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":2.5,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":3,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":3.5,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":4,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":0.8,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1),
('{"speed":{"rate":0.2,"detune":0},"delay":{"time":0,"feedback":0,"dry":1,"wet":0},"compressor":{"threshold":-60,"ratio":1,"attack":0,"release":0},"eq":{"band1":{"frequency":100,"gain":0},"band2":{"frequency":500,"gain":0},"band3":{"frequency":1000,"gain":0},"band4":{"frequency":2500,"gain":0},"band5":{"frequency":8000,"gain":0}}}',1,1);