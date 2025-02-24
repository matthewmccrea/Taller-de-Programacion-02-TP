import express from "express";
import path from "path";
import { addUser, findByCredentials, generateAuthToken, getUsers, getUser, deleteUser } from "../data/users.js";
import { auth} from "../middleware/auth.js";

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


 router.get("/list", auth,async(req, res) => {
    
    
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


// ENDPOINT PARA ELIMINAR UN PRODUCTO POR ID
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("El id del user a eliminar es:", userId);

    // Aquí llamarías a la función para eliminar el producto desde la capa de datos
    const result = await deleteUser(userId);

    if (result) {
      res.status(200).json({ message: "User eliminado correctamente" });
    } else {
      res.status(404).json({ message: "User no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar el User:", error);
    res.status(500).send("Error al eliminar el user");
  }
});

export default router;
