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

 export async function getSeller(id) {
    const clientmongo = await getConnection();
  
    const seller = await clientmongo
    
    .db("sample_tp2")
    .collection("sellers")
    .findOne({ _id: new ObjectId(id) });
    return seller;
  }
    
  export async function deleteSeller(id) {
      const seller = getSeller(id);
      for (const key in seller) {
        if (buyer.hasOwnProperty(key)) {
        }
    }
  
      const clientmongo = await getConnection();
    
      const result = await clientmongo
        .db("sample_tp2")
        .collection("sellers")
        .deleteOne({ _id: new ObjectId(id) });
      return result;
    }


    export async function addSeller(seller) {
        if (!seller || Object.keys(seller).length === 0) {
          return; 
      }
    
       
        const clientmongo = await getConnection();
      
        const result = await clientmongo
          .db("sample_tp2")
          .collection("sellers")
          .insertOne(seller);
        return result;
    
      }