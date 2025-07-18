CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(255) PRIMARY KEY,
	created_at DATE DEFAULT CURRENT_DATE NOT NULL,
	last_login DATE DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_posts (
	id SERIAL PRIMARY KEY,
	user_username VARCHAR(255) NOT NULL,
	post_date DATE DEFAULT CURRENT_DATE NOT NULL,
	post_text TEXT NOT NULL,
	post_color TEXT NOT NULL,
	CONSTRAINT fk_user_id
	FOREIGN KEY (user_username)
	REFERENCES users(username)
	ON DELETE CASCADE,
	CONSTRAINT unique_user_post_per_day
	UNIQUE (user_username, post_date)
);
