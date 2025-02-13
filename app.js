import express from "express";
import inventorRouter from "./routes/inventor.js";
import userRouter from "./routes/users.js";
import buyerRouter from "./routes/buyers.js";
import productRouter from "./routes/products.js";
import sellerRouter from "./routes/sellers.js";
import saleRouter from "./routes/sale.js";
import loginRouter from "./routes/login.js";
import homeRouter from "./routes/home.js";
import registerRouter from "./routes/register.js";
import playgroundRouter from "./routes/playground.js";
import cookieParser from "cookie-parser";
import { auth } from "./middleware/auth.js";
import ejs from "ejs";

//TODO llevarlo a archivo de config
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/api/inventors", inventorRouter);
app.use("/api/users",userRouter);
app.use("/api/buyers",auth,buyerRouter);
app.use("/api/products",auth,productRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/sale", saleRouter);
app.use("/api/login", loginRouter);
app.use("/api/playground", playgroundRouter);
app.use("/api/register", registerRouter);
app.use("/api/home",homeRouter);
app.use('/images', express.static('C:/Users/matth/OneDrive/Área de Trabalho/Workspace Visual Studio Code/Taller-de-Programacion-02-TP/images'));

app.listen(PORT, () => {
  console.log("Servidor Web Express en el puerto: ", PORT);
});
