import getConnection from "./connection.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


export async function getUsers() {
    const clientmongo = await getConnection();
    const users = await clientmongo
      .db("sample_tp2")
      .collection("users")
      .find()
      .toArray();


    return users;
  }


export async function addUser(user) {
  user.email = user.email.toLowerCase();
  user.password = await bcryptjs.hash(user.password, 10);
  user._id = new ObjectId();

  console.log("User: "+user.email, user.password, user.id);

  const clientMongo = await getConnection();

  const result = clientMongo
    .db("sample_tp2")
    .collection("users")
    .insertOne(user);
  return result;
}

export async function findByCredentials(email, password) {
  console.log("Email: "+email + " Password: "+password);
  const clientMongo = await getConnection();
  const user = await clientMongo
    .db("sample_tp2")
    .collection("users")
    .findOne({ email: email });


  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales no validas");
  }

  return user;
}

export function generateAuthToken(user) {
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  return token;
}
