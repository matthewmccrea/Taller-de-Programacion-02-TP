import express from "express";
import { getProducts, getProduct, addProduct } from "../data/products.js";
import { auth } from "../middleware/auth.js";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();


router.get("/list",async(req, res) => {



  res.sendFile(path.join(__dirname, "views", "products", "listProducts.html"));
  
  
});



router.get("/verify-list", auth, async (req, res) => {
  try {
    res.json({ success: true, message: "Acceso permitido a la lista de productos" });
  } catch (error) {
    res.json({ success: false, message: "No autorizado o error en la verificación" });
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


router.post("/editProduct", async (req, res) => {
  try {
    console.log("Dentro del Edit Product");

    // Verificar si el producto tiene un ID
    const productId = req.body._id; 

    productId.toString();

    console.log("El id del producto es: "+productId)
    // Si _id existe, significa que es una actualización
    if (productId) {
      console.log("ID de producto: ", productId);
      // Llamar a la función para actualizar el producto
      const result = await addProduct(req.body); 

      if (result.action === "updated") {
        console.log("Producto actualizado correctamente");
      }
    } else {
      // Si no existe el _id, es una creación
      console.log("Creando nuevo producto");
      const result = await addProduct(req.body);

      if (result.action === "inserted") {
        console.log("Producto creado correctamente");
      }
    }

    res.redirect("/api/products/listProducts"); 

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


  //ENDPOINT PARA CREAR UN PRODUCTO NUEVO
  router.post("/", async (req, res) => {
    const product = await addProduct(req.body);
    res.json(product);
  });

  export default router;