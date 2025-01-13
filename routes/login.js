import express from "express";
import { addInventor, getInventor, getInventors } from "../data/inventor.js";
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

