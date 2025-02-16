import express from "express";
import path from "path";
import { addUser, findByCredentials, generateAuthToken, getUsers } from "../data/users.js";

const router = express.Router();
const __dirname = path.resolve();

router.post("/deleteUser", async (req, res) => {
  const result = await deleteUser(req.body);

  try {
    
  } catch (error) {
    
  }
  res.send(result);
});

router.get("/", async (req, res) => {
    const users = await getUsers();
    res.json(users);
  });

router.post("/", async (req, res) => {
  console.log("Estoy dentro del post");
  console.log("Datos recibidos:", req.body); 
  const result = await addUser(req.body);
  res.send(result);
});


 router.get("/list",async(req, res) => {
    
    
    res.sendFile(path.join(__dirname, "views", "users", "listUsers.html"));
  });


//Login con redirect a home
router.post("/login", async (req, res) => {
  console.log("Estoy dentro del login/post");
  console.log("Datos recibidos:", req.body); 
  try {
    
    const user = await findByCredentials(req.body.email, req.body.password); 
    console.log("El usuario es: "+user);   
    const token = generateAuthToken(user);
  


    res.json({
      token,
      redirectUrl: `/api/home?token=${token}`,
    });
  } catch (error) {
    res.status(401).json({
      message: "Credenciales inválidas. Intente nuevamente.",
      redirectUrl: "/login",
    });
  }
});

export default router;
