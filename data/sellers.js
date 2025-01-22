import { ObjectId } from "mongodb";
import getConnection from "./connection.js";

export async function getSellers() {
    const clientmongo = await getConnection();
  
    const sellers = await clientmongo
      .db("sample_tp2")
      .collection("sellers")
      .find()
      .toArray();
    return sellers;
  }