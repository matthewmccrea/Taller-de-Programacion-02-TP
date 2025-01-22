import express from "express";
import path from "path";
import { addUser, findByCredentials, generateAuthToken } from "../data/user.js";

const router = express.Router();
const __dirname = path.resolve();

router.post("/deleteUser", async (req, res) => {
  const result = await deleteUser(req.body);

  try {
    
  } catch (error) {
    
  }
  res.send(result);
});

router.post("/", async (req, res) => {
  const result = await addUser(req.body);
  res.send(result);
});

//Login con redirect a home
router.post("/login", async (req, res) => {
  try {
    const user = await findByCredentials(req.body.email, req.body.password);    
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
