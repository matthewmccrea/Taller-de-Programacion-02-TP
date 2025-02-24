import express from "express";
import path from "path";
import { addUser } from "../data/users.js";
import { auth } from "../middleware/auth.js";
import http from "http";



const router = express.Router();
const __dirname = path.resolve();

//EDNPOINT QUE DEVUELVE EL REGISTER.HTML
router.get("/", async(req,res)=>{

res.sendFile(path.join(__dirname, "views", "register", "register.html"));
})

router.post("/", async(req,res)=>{

    const user = req.body;

    console.log("user"+user)

    const createdUser = addUser(user)


    if (createdUser!=null){
        res.send("Usuario creado correctamente");    }
    else{
        res.send("Error al crear usuario")
    }


    })


export default router;

