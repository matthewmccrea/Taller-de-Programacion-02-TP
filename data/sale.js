import { ObjectId } from "mongodb";
import getConnection from "./connection.js";

export async function getSales() {
    console.log("Entrando en el método getProducts");
    const clientmongo = await getConnection();
  
    const sales = await clientmongo
      .db("sample_tp2")
      .collection("sale")
      .find()
      .toArray();
    return sales;
  }



  export async function getSale(id) {

    const clientmongo = await getConnection();
  
    const sale = await clientmongo
      .db("sample_tp2")
      .collection("sale")
      .findOne({ _id: new ObjectId(id) });
  
    return sale;
  }