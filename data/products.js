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
        // Convertir el _id en un ObjectId
        let idProduct = new ObjectId(product._id);
    
        // Obtener el producto existente de la base de datos
        let existingProduct = await getProduct(idProduct);  // Asegúrate de usar await
    
        if (existingProduct) {
          // Si el producto existe, lo eliminamos
          const clientmongo = await getConnection();
          await clientmongo
            .db("sample_tp2")
            .collection("products")
            .deleteOne({ _id: idProduct });
    
          // Insertar el nuevo producto
          await clientmongo
            .db("sample_tp2")
            .collection("products")
            .insertOne(product);  // Aquí insertas el nuevo producto
          console.log("Producto reemplazado correctamente");
        } else {
          console.log("Producto no encontrado para reemplazar");
        }
      } catch (error) {
        console.error("Error al procesar el producto:", error);
      }
    }
    
  