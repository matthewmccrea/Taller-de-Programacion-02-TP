import express from "express";
import path from "path";
import { getSellers,deleteSeller, addSeller } from "../data/sellers.js";

const router = express.Router();
const __dirname = path.resolve();

router.get("/", async (req, res) => {
    const sellers = await getSellers();
    res.json(sellers);
  });

 router.get("/list",async(req, res) => {
    
    
    res.sendFile(path.join(__dirname, "views", "sellers", "listSellers.html"));
  });


router.post("/createSeller", async (req, res) => {
    try {
      console.log("Dentro del Edit Buyer");
  
      const seller = req.body;
       
        const result = await addSeller(seller); 
          res.redirect("/api/sellers/list");         
  
  
    } catch (error) {
      console.error("Error al procesar el seller:", error);
      res.status(500).send("Error al procesar el seller");
    }
  });


 //ENDPOINT PARA ELIMINAR BUYERS
  router.delete("/deleteSeller/:id", async (req, res) => {
    const seller = await deleteSeller(req.params.id)
    res.send(seller);
  });


router.get("/createSeller", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "sellers", "createSellers.html"));
  });


  export default router;