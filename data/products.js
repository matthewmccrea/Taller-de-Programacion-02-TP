import { ObjectId } from "mongodb";
import getConnection from "./connection.js";

export async function getProducts() {
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

    export async function deleteProduct(id) {
      const product = getProduct(id);
      for (const key in product) {
        if (product.hasOwnProperty(key)) {
        }
    }
  
      const clientmongo = await getConnection();
      const result = await clientmongo
        .db("sample_tp2")
        .collection("products")
        .deleteOne({ _id: new ObjectId(id) });
      return result;
    }


  
    export async function addProduct(product) {
      try {
        product._id = new ObjectId();
        const clientmongo = await getConnection();
         
          await clientmongo
            .db("sample_tp2")
            .collection("products")
            .insertOne(product);  
          console.log("Producto reemplazado correctamente");
         
      } catch (error) {
        console.error("Error al procesar el producto:", error);
      }
    }

    export async function updateProduct(id, updatedData) {
      
        const clientmongo = await getConnection();
        // Actualizamos el producto con la nueva información
        const result = await clientmongo
          .db("sample_tp2")
          .collection("products")
          .updateOne(
            { _id: new ObjectId(id) },
            {
              $set: updatedData, // Esto establece los campos a actualizar
            }
          );
      
    }
    

  