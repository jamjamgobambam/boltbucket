CREATE TABLE options (
    id serial PRIMARY KEY,
    category text,
    color text,
    price money,
    image text,
    iscombo boolean,
    iscoupe boolean
);

CREATE TABLE customcar (
    id serial PRIMARY KEY,
    name text,
    exterior_id integer,
    roof_id integer,
    wheels_id integer,
    interior_id integer
);