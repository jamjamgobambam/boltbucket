CREATE TABLE exteriors (
    id serial PRIMARY KEY,
    color text,
    price money,
    image text
);

CREATE TABLE interiors (
    id serial PRIMARY KEY,
    color text,
    price money,
    image text,
    iscombo boolean
);

CREATE TABLE roofs (
    id serial PRIMARY KEY,
    color text,
    price money,
    image text,
    iscoupe boolean
);

CREATE TABLE wheels (
    id serial PRIMARY KEY,
    color text,
    price money,
    image text
);