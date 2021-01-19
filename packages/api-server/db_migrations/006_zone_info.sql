CREATE TABLE IF NOT EXISTS zone_resources (
  id serial PRIMARY KEY,
  zone_id INT NOT NULL,
  resource_type VARCHAR(25) NOT NULL,
  resource_tier SMALLINT NOT NULL,
  resource_count SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS zone_markers (
  id serial PRIMARY KEY,
  zone_id INT NOT NULL,
  marker_type VARCHAR(50) NOT NULL,
  posX SMALLINT NOT NULL,
  posY SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS zone_mobs (
  id serial PRIMARY KEY,
  zone_id INT NOT NULL,
  mob_name VARCHAR(50) NOT NULL,
  mob_count SMALLINT NOT NULL
);