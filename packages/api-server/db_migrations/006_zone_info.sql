ALTER TABLE zones ADD is_deep_road BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE servers ALTER COLUMN subdomain TYPE VARCHAR(50);
ALTER TABLE royal_connections ALTER COLUMN conn_type TYPE VARCHAR(50);
ALTER TABLE user_logs ALTER COLUMN details TYPE JSONB USING details::jsonb;

DROP TABLE IF EXISTS server_contracts;
DROP INDEX IF EXISTS idx_server_contracts;

CREATE TABLE IF NOT EXISTS server_logs (
  log_type VARCHAR(25) NOT NULL,
  log_data JSONB NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_zone_log_time ON server_logs (log_type, created_on);

CREATE TABLE IF NOT EXISTS zone_resources (
  id serial PRIMARY KEY,
  zone_id INT NOT NULL,
  resource_type VARCHAR(25) NOT NULL,
  resource_tier VARCHAR (10) NOT NULL,
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
  mob_tier VARCHAR (10) NOT NULL,
  mob_count SMALLINT NOT NULL
);