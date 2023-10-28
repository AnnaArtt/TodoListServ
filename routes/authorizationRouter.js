import Router from "express";
import controllerAuthorization from "../Controllers/authorizationController.js";
import { check } from "express-validator";
// import authorizationMiddleware from "../middleware/authorizationMiddleware.js";
import AuthorizationProxy from "../Proxy/AuthorizationProxy.js";

const router = new Router();

router.post(
  "/login",
  [
    check("login", "Empty field").notEmpty(),
    check("password", "Empty field").notEmpty(),
  ],
  controllerAuthorization.login
);
router.post("/registration", controllerAuthorization.registration);
// router.get(
//   "/accounts-list",
//   authorizationMiddleware,
//   controllerAuthorization.getAccountsLists
// );

router.get("/accounts-list", (req, res) => {
  AuthorizationProxy.getAccountsLists(req, res);
});

export default router;
