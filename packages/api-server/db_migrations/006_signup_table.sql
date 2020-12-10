-- We can't do this, so no reason to keep it around
DROP TABLE server_contracts;
DROP INDEX idx_server_contracts;

-- Create signup table

CREATE TABLE IF NOT EXISTS server_signup (
  id serial PRIMARY KEY,
  subdomain VARCHAR ( 15 ) UNIQUE NOT NULL,
  discord_id VARCHAR ( 50 ),
  contact_email VARCHAR (100) NOT NULL,
  generated_key VARCHAR (10) UNIQUE NOT NULL,
  estimated_size SMALLINT,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);