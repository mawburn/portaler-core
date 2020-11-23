CREATE INDEX idx_portal_servers ON portals (server_id);
CREATE INDEX idx_portal_size_expires ON portals (expires, size);

CREATE TABLE IF NOT EXISTS server_contracts (
  id serial PRIMARY KEY,
  server_id INT NOT NULL,
  plan_size INT NOT NULL,
  silver_paid INT,
  paid_on TIMESTAMP WITH TIME ZONE,
  ends_on TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_server_contracts ON server_contracts (server_id, plan_size, ends_on);

ALTER TABLE user_roles
ADD COLUMN created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW();
