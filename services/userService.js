import { executeQuery } from "../database/database.js";

const addUser = async (email, passwordHash) => {
    await executeQuery(
      "INSERT INTO users (email, password) VALUES ($1, $2);",
      email,
      passwordHash,
    );
  };

  const findUsersWithEmail = async (email) => {
    return await executeQuery(
      "SELECT * FROM users WHERE email = $1",
      email,
    );
  };


export { addUser, findUsersWithEmail };