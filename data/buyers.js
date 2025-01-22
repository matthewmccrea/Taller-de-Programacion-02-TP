import { ObjectId } from "mongodb";
import getConnection from "./connection.js";

export async function getBuyers() {
    const clientmongo = await getConnection();
  
    const buyers = await clientmongo
      .db("sample_tp2")
      .collection("buyers")
      .find()
      .toArray();
    return buyers;
  }

  export async function getBuyer(id) {
    const clientmongo = await getConnection();
  
    const buyer = await clientmongo
    
    .db("sample_tp2")
    .collection("buyers")
    .findOne({ _id: new ObjectId(id) });
    return buyer;
  }

  export async function addBuyer(buyer) {
    if (!buyer || Object.keys(buyer).length === 0) {
      return; 
  }

   
    const clientmongo = await getConnection();
  
    const result = await clientmongo
      .db("sample_tp2")
      .collection("buyers")
      .insertOne(buyer);
    return result;

  }
  



  export async function deleteBuyer(id) {
    const buyer = getBuyer(id);
    for (const key in buyer) {
      if (buyer.hasOwnProperty(key)) {
      }
  }

    const clientmongo = await getConnection();
  
    const result = await clientmongo
      .db("sample_tp2")
      .collection("buyers")
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  }