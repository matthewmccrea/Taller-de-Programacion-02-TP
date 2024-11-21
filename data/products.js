import { ObjectId } from "mongodb";
import getConnection from "./connection.js";

export async function getProducts() {
    console.log("Entrando en el método getProducts");
    const clientmongo = await getConnection();
  
    const products = await clientmongo
      .db("sample_tp2")
      .collection("products")
      .find()
      .toArray();
    return products;
  }