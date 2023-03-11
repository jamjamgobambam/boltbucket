CREATE TABLE options (
    id serial PRIMARY KEY,
    category text,
    color text,
    price money,
    image text,
    iscombo boolean,
    iscoupe boolean
);