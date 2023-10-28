import Router from "express";
import controllerMember from "../Controllers/MemberController.js";
import authorizationMiddleware from "../middleware/authorizationMiddleware.js";
import { check } from "express-validator";

const router = new Router();

router.post(
  "/newMember",
  [
    check("userName", "Empty field").notEmpty(),
    check("status", "Empty field").notEmpty(),
  ],
  controllerMember.addNewMember
);
router.get(
  "/getMember:userId",
  authorizationMiddleware,
  controllerMember.getMember
);

export default router;
