import { ObjectId } from "mongodb";
import getConnection from "./connection.js";

export async function getSellers() {
    console.log("Entrando en el método getSellers");
    const clientmongo = await getConnection();
  
    const sellers = await clientmongo
      .db("sample_tp2")
      .collection("sellers")
      .find()
      .toArray();
    return sellers;
  }