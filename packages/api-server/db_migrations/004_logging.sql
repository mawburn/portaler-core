CREATE TYPE user_action_enum AS ENUM ('add', 'update', 'delete', 'login');

CREATE TABLE IF NOT EXISTS user_logs (
  user_id INT NOT NULL,
  server_id INT NOT NULL,
  user_action user_action_enum NOT NULL,
  details VARCHAR (1024),
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
