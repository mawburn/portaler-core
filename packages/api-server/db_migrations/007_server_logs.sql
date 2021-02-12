DROP TABLE IF EXISTS server_logs;
DROP INDEX IF EXISTS idx_zone_log_time;

CREATE TABLE IF NOT EXISTS server_logs (
  log_type VARCHAR(25) NOT NULL,
  log_subtype VARCHAR(50) NULL,
  log_data JSONB NULL,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  PRIMARY KEY (log_type, created_on)
);


