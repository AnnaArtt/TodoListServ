import jwt from "jsonwebtoken";
import secret from "../config.js";
import controllerAuthorization from "../Controllers/authorizationController.js";

class AuthorizationProxy {
  constructor(controller) {
    this.controller = controller;
  }

  getAccountsLists(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "Account is not authorized" });
      }

      const decodedData = jwt.verify(token, secret.secret);
      req.account = decodedData;

      // Виклик методу контроллера
      return this.controller.getAccountsLists(req, res);
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Account is not authorized" });
    }
  }
}

export default new AuthorizationProxy(controllerAuthorization);
