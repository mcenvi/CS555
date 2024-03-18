import usersData from "./data/users.js";
// import { users } from "./config/mongoCollections.js";
import { dbConnection, closeConnection } from "./config/mongoConnection.js";
const db = await dbConnection();
await db.dropDatabase();

let user1;
try {
    user1 = await usersData.registerUser(
      "myFirstName",
      "myLastName",
      "vincent@ooo.com",
      "Test111@",
    );
    console.log(user1);
  } catch (e) {
    console.log(e);
}