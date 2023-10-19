import express from "express";
import { loginUser } from "../user/user.controller";
import {
  postService,
  getAllServiceController,
  getServiceByCategoryIdController,
  updateServiceController,
  deleteServiceController,
  getSingleServiceController,
} from "./services.controller";
const router = express.Router();
router.post("/create-service", postService);
router.get("/services", getAllServiceController);
router.patch("/services/:id", updateServiceController);
router.delete("/services/:id", deleteServiceController);
router.get("/services/category/:categoryId", getServiceByCategoryIdController);
router.get("/services/:id", getSingleServiceController);
export const shebaServices = router;
