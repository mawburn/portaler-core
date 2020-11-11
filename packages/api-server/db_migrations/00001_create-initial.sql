-- Create User & Server Data

CREATE TABLE [IF NOT EXISTS] users (
  id serial PRIMARY KEY,
  discord_id VARCHAR ( 50 ) UNIQUE NOT NULL,
  discord_name VARCHAR ( 50 ) NOT NULL,
  discord_refresh VARCHAR ( 100 ) NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (discord_id, discord_name)
VALUES ('0', 'Portaler');

CREATE TABLE [IF NOT EXISTS] servers (
  id serial PRIMARY KEY,
  discord_id VARCHAR ( 50 ) UNIQUE NOT NULL,
  discord_name VARCHAR ( 50 ) NOT NULL,
  subdomain VARCHAR ( 15 ),
  created_on TIMESTAMP NOT NULL DEFAULT NOW(),
);

CREATE TABLE [IF NOT EXISTS] roles (
  id serial PRIMARY KEY,
  server_id INT UNIQUE NOT NULL,
  discord_role_id VARCHAR ( 50 ) UNIQUE NOT NULL,
  last_updated TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE [IF NOT EXISTS] user_servers (
  user INT NOT NULL,
  server_id INT NOT NULL,
  PRIMARY KEY (user, server_id),
  FOREIGN KEY (user)
    REFERENCES users (id),
  FOREIGN KEY (server_id)
    REFERENCES servers (id)
);

CREATE TABLE [IF NOT EXISTS] user_roles (
  user INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user, role_id),
  FOREIGN KEY (user)
    REFERENCES users (id),
  FOREIGN KEY (role_id)
    REFERENCES roles (id)
);

-- Create Portal & Connection Data

CREATE TABLE [IF NOT EXISTS] portals (
  id serial PRIMARY KEY,
  server_id INT NOT NULL,
  conn1 VARCHAR ( 100 ) NOT NULL,
  conn2 VARCHAR ( 100 ) NOT NULL,
  size SMALLINT NOT NULL,
  expires TIMESTAMP NOT NULL,
  created_by INT NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT NOW()
);
