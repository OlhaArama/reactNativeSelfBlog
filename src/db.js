import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("post.db");

export const init = async () => {
  try {
    await db.execAsync('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT NOT NULL, date TEXT, booked INT)',
  )
  } catch (error) {
    console.log("Init DB error:", error);
  }
};

export const getPosts = async () => {
  try {
    const posts = await db.getAllAsync('SELECT * FROM posts');

    return posts;
  } catch (error) {
    console.log("Load posts error:", error);
  }
};

export const createPost = async ({text, date, booked, img}) => {
  try {
    const result = await db.runAsync(`INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`, text, date, 0, img);

    return result.lastInsertRowId;
  } catch (error) {
    console.log("Create error:", error);
  }
};

export const removePost = async (id) => {
  try {
    await db.runAsync('DELETE FROM posts WHERE id=$id', { $id: id })
    // await db.runAsync('DROP TABLE posts')
  } catch (error) {
    console.log("Delete error:", error);
  }
};

export const updatePost = async (post) => {
  try {
    await db.runAsync('UPDATE posts SET booked = ? WHERE id = ?', post.booked ? 0 : 1, post.id);
  } catch (error) {
    console.log("Togge bookedl error:", error);
  }
};
