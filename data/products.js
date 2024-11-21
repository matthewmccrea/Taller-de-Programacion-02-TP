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
  export async function getProduct(id) {

    const clientmongo = await getConnection();
  
    const product = await clientmongo
      .db("sample_tp2")
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
  
    return product;
  }

  export async function addProduct(product) {
    console.log("Agregando un product")
    for (const key in product) {
      if (product.hasOwnProperty(key)) {
          console.log(`${key}: ${product[key]}`);
      }
  }
    const clientmongo = await getConnection();
  
    const result = await clientmongo
      .db("sample_tp2")
      .collection("products")
      .insertOne(product);
    return result;
  }