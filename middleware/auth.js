import jwt from 'jsonwebtoken';

export async function auth(req, res, next) {
  try {
    console.log('Solicitud completa:', req); // Imprime la solicitud completa

    console.log('Token desde la cabecera Authorization:', req.header('Authorization'));
    console.log('Token desde Cookies:', req.header('Authorization'));
    const token = req.cookies.authToken || req.header("Authorization");
    console.log("El token es: "+token);

    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
}
