import jwt from "jsonwebtoken";


export async function auth(req, res, next) {
  try {
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);
    console.log("Query params:", req.query);

    // Obtiene el token desde los headers o desde los parámetros de la URL
    const authHeader = req.header("Token");
    const token = authHeader || req.query.token; // Prioriza los headers, luego los parámetros de la URL

    console.log("Token recibido:", token);

    if (!token) {
      return res.status(401).send("Token is required");
    }

    // Verifica el token
    jwt.verify(token, process.env.SECRET);
    next(); // Continúa con la solicitud si el token es válido
  } catch (error) {
    console.error("Error en el middleware auth:", error.message);

    // Manejo de errores específicos de JWT
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    } else {
      return res.status(500).send("Authentication error");
    }
  }
}

