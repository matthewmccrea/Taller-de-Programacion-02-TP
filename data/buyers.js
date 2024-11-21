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

  export async function getBuyer(id) {
    console.log("Entrando en el método getBuyers");
    const clientmongo = await getConnection();
  
    const buyer = await clientmongo
    
    .db("sample_tp2")
    .collection("buyers")
    .findOne({ _id: new ObjectId(id) });
    return buyer;
  }

  export async function addBuyer(buyer) {
    console.log("Agregando un buyer")
    for (const key in buyer) {
      if (buyer.hasOwnProperty(key)) {
          console.log(`${key}: ${buyer[key]}`);
      }
  }
    const clientmongo = await getConnection();
  
    const result = await clientmongo
      .db("sample_tp2")
      .collection("buyers")
      .insertOne(buyer);
    return result;
  }
  

  // export async function getSale(id) {
  //   console.log("Entrando en el método getSale de Buyer");
  //   const clientmongo = await getConnection();
  //   const product = await getProduct(id);

  //   const sale = await clientmongo
  //     .db("sample_tp2")
  //     .collection("sale")
  //     .find()
  //     .toArray();
  //   return sale;
  // }



  export async function deleteBuyer(id) {
    console.log("Eliminando el siguiente Buyer: ")
    const buyer = getBuyer(id);
    for (const key in buyer) {
      if (buyer.hasOwnProperty(key)) {
          console.log(`${key}: ${buyer[key]}`);
      }
  }

    const clientmongo = await getConnection();
  
    const result = await clientmongo
      .db("sample_tp2")
      .collection("buyers")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  }