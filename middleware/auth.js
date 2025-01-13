import jwt from "jsonwebtoken";

export async function auth(req, res, next) {
  try {
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);

    const authHeader = req.header("Authorization");
    const token = req.cookies.authToken || (authHeader && authHeader.split(" ")[1]);

    if (!token) {
      return res.status(401).send("Token is required");
    }

    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).send("Invalid token");
    } else {
      return res.status(500).send("Authentication error");
    }
  }
}
