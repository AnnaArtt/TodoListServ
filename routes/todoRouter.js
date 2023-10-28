import Router from "express";
import controllerTodo from "../Controllers/TodoController.js";
import authorizationMiddleware from "../middleware/authorizationMiddleware.js";
import { check } from "express-validator";

const router = new Router();

router.get(
  "/getList:listId",
  authorizationMiddleware,
  controllerTodo.getTodoList
);
router.post(
  "/createTodo:listId",
  authorizationMiddleware,
  controllerTodo.createTodo
);
router.delete(
  "/delete:listId",
  authorizationMiddleware,
  controllerTodo.deleteTodo
);
router.put("/updateTodo", authorizationMiddleware, controllerTodo.updateTodo);

export default router;
