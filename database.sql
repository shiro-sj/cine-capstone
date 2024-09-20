

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);


INSERT INTO users (user_name, email, password)
VALUES ('harman', 'harman@hotmail.com', '123');

INSERT INTO users (user_name, email, password)
VALUES ('Jeff', 'Jeff@hotmail.com', '123');
