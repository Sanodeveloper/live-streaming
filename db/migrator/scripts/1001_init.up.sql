CREATE TABLE users (
    `id` bigint PRIMARY KEY AUTO_INCREMENT,
    `name` text NOT NULL,
    `email` varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL
);

CREATE TABLE rooms (
    `roomId` bigint UNSIGNED PRIMARY KEY,
    `title` varchar(40) NOT NULL,
    `distributor` text NOT NULL,
    `peopleNum` int NOT NULL,
    `info` text NOT NULL
);

CREATE TABLE roomStates (
    `roomId` bigint UNSIGNED PRIMARY KEY,
    `camOn` boolean NOT NULL,
    `micOn` boolean NOT NULL,
    `screenShareOn` boolean NOT NULL
);

CREATE TABLE tags (
    `id` bigint PRIMARY KEY AUTO_INCREMENT,
    `roomId` bigint UNSIGNED NOT NULL,
    `tag` varchar(40) NOT NULL
);

CREATE TABLE talkLogs (
    `id` bigint PRIMARY KEY AUTO_INCREMENT,
    `roomId` bigint UNSIGNED NOT NULL,
    `userName` text NOT NULL,
    `comment` text NOT NULL
);

CREATE TABLE sessionInfo (
    `id` bigint PRIMARY KEY AUTO_INCREMENT,
    `sessionId` text NOT NULL,
    `name` text NOT NULL
);