import express from "express";
import {
  addTOCartController,
  getMyCartByUserIdController,
  deleteMyCartController,
} from "./myCart.controller";

const router = express.Router();
router.post("/add-to-cart", addTOCartController);
router.get("/mycart/:userId", getMyCartByUserIdController);
router.delete("/mycart/:id", deleteMyCartController);

export const cartServices = router;
