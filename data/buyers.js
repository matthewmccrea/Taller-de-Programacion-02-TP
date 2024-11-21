import { ObjectId } from "mongodb";
import getConnection from "./connection.js";

export async function getBuyers() {
    console.log("Entrando en el método getBuyers");
    const clientmongo = await getConnection();
  
    const buyers = await clientmongo
      .db("sample_tp2")
      .collection("buyers")
      .find()
      .toArray();
    return buyers;
  }