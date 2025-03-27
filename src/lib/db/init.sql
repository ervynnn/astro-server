CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('JPop', 'Rock', 'Alternative', 'Ballad')),
  img TEXT NOT NULL,
  releaseDate TEXT NOT NULL,
  ytlink TEXT NOT NULL,
  lyrics TEXT NOT NULL
);
