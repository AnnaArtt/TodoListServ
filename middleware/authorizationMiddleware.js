import jwt from "jsonwebtoken";
import secret from "../config.js";

function authorizationMiddleware(req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Account is not authorize" });
    }

    const decodedData = jwt.verify(token, secret.secret);
    req.account = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Account is not authorize" });
  }
}

export default authorizationMiddleware;
