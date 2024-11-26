import express from "express";
import { addInventor, getInventor, getInventors } from "../data/inventor.js";
import {} from "../data/login.js";
import path from "path";
import { auth } from "../middleware/auth.js";
import http from "http";



const router = express.Router();
const __dirname = path.resolve();

//EDNPOINT QUE DEVUELVE EL LOGIN.HTML
router.get("/", async(req,res)=>{

res.sendFile(path.join(__dirname, "views", "login", "login.html"));
})



export default router;

//ENDPOINT PARA OBTENER TODOS LOS INVENTORS
// router.get("/", auth, async (req, res) => {
//   const inventors = await getInventors();
//   res.json(inventors);
// });

// //ENDPOINT PARA OBTENER UN INVENTOR POR ID
// router.get("/:id", async (req, res) => {
//   const inventor = await getInventor(req.params.id);
//   res.json(inventor);
// });

// //ENDPOINT PARA AGREGAR UN INVENTOR
// router.post("/", async (req, res) => {
//   const inventor = req.body;
//   const result = await addInventor(inventor);
//   res.json(result);
// });

// // TODO: llamar a la funcion de la capa de datos
// router.put("/:id", (req, res) => {
//   res.send("endpoint put inventor:" + JSON.stringify(req.body));
// });

// //ENDPOINT PARA ELIMINAR UN INVENTOR 
// router.delete("/:id", (req, res) => {
//   res.send("endpoint delete inventor:" + req.params.id);
// });