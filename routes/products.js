import express from "express";
import { getProducts, getProduct, addProduct, deleteProduct, updateProduct } from "../data/products.js";
import { auth } from "../middleware/auth.js";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();


router.get("/list",async(req, res) => {



  res.sendFile(path.join(__dirname, "views", "products", "listProducts.html"));

});




// ENDPOINT PARA ELIMINAR UN PRODUCTO POR ID
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("El id del producto a eliminar es:", productId);

    // Aquí llamarías a la función para eliminar el producto desde la capa de datos
    const result = await deleteProduct(productId);

    if (result) {
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error al eliminar el producto");
  }
});


router.get("/editProduct/:id", async (req, res) => {
  try {

    console.log("El id del producto es:"+req.params)
    const product = await getProduct(req.params.id); 


    product._id = product._id.toString();
    res.render("products/createProducts", { product }); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el producto");
  }
});


router.post("/createProduct", async (req, res) => {
  try {
    console.log("Dentro del Edit Product");

   

    const product = req.body;
     
      const result = await addProduct(product); 
        res.redirect("/api/products/list");         
      //res.sendFile(path.join(__dirname, "views", "products", "listProducts.html"));


  } catch (error) {
    console.error("Error al procesar el producto:", error);
    res.status(500).send("Error al procesar el producto");
  }
});




//ENDPOINT PARA OBTENER TODOS LOS PRODUCTOS
router.get("/", async (req, res) => {
    const products = await getProducts();
    res.json(products);
  });

  //ENDOINT QUE DEVUELVE VIEW PARA CREAR PRODUCTOS
   router.get("/createProduct", (req, res) => {
      res.render("products/createProducts",{ product: null }); 

    });


//ENDPOINT PARA OBTENER UN PRODUCTO POR ID
  router.get("/:id", async (req, res) => {
    const product = await getProduct(req.params.id);
    res.json(product);
  });

// Ruta para editar un producto
router.post("/editProduct", async (req, res) => {
  try {
    const { _id, nombre, descripcion, precio, categoria, imagenes } = req.body;
    
    // Llamar a la función para actualizar el producto en la base de datos
    const updatedProduct = await updateProduct(_id, { nombre, descripcion, precio, categoria, imagenes });

    if (updatedProduct) {
      res.redirect("/api/products/list"); // Redirigir a la lista de productos
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error al actualizar el producto");
  }
});

 

  export default router;