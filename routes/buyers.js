import express from "express";
import path from "path";
import { addBuyer, getBuyers, getBuyer,deleteBuyer,updateBuyer} from "../data/buyers.js";
import { auth } from "../middleware/auth.js";


const router = express.Router();
const __dirname = path.resolve();

  //EDNPOINT PARA OBTENER TODOS LOS BUYERS
router.get("/", async (req, res) => {
    const buyers = await getBuyers();
    res.json(buyers);
  });


 

  //ENDPOINT DE TESTING QUE DEVUELVE UN HTML
  router.get("/list",async(req, res) => {
    
    
    res.sendFile(path.join(__dirname, "views", "buyers", "listBuyers.html"));
  });

  router.get("/editBuyer/:id", async (req, res) => {
    const buyerId = req.params.id;
    const token = req.query.token; // Obtenemos el token desde la query string
  
    // Verificar que el ID es válido (y si es necesario, buscar el comprador)
    if (!buyerId || !token) {
      return res.status(400).send("ID o token no válidos");
    }
  
    try {
      // Buscar el comprador por su ID
      const buyer = await getBuyer(buyerId); // Asegúrate de tener esta función para obtener los detalles del comprador
      if (!buyer) {
        return res.status(404).send("Buyer not found");
      }
  
      // Enviar la vista de edición y pasar los datos del comprador
      res.render("buyers/editBuyer", { 
        buyer
        
      });
  
    } catch (error) {
      console.error("Error fetching buyer:", error);
      res.status(500).send("Internal server error");
    }
  });
  
  router.post("/editBuyer", async (req, res) => {
    const buyer = req.body; 
  
    try {
   
      const updatedBuyer = await updateBuyer(buyer); 
  
      res.redirect(`/api/buyers/list`); 
    } catch (error) {
      console.error("Error al procesar la edición del comprador:", error);
      res.status(500).send("Error al procesar la edición del comprador");
    }
  });

  
  router.post("/createBuyer", async (req, res) => {
    try {
      console.log("Dentro del Edit Buyer");
  
      const buyer = req.body;
       
        const result = await addBuyer(buyer); 
          res.redirect("/api/buyers/list");         
  
  
    } catch (error) {
      console.error("Error al procesar el buyer:", error);
      res.status(500).send("Error al procesar el buyer");
    }
  });

  router.get("/createBuyer", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "buyers", "createBuyers.html"));
  });



  //ENDPOINT PARA OBTENER UN BUYER POR ID
  router.get("/:id", async (req, res) => {
    const buyer = await getBuyer(req.params.id);
    res.json(buyer);
  });


  //ENDPOINT PARA ELIMINAR BUYERS
  router.delete("/deleteBuyer/:id", async (req, res) => {
    const buyer = await deleteBuyer(req.params.id)
    res.send(buyer);
  });


  export default router;