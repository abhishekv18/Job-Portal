import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addToSave,fetchSaveItems,deleteSaveItem } from "../controllers/save.controller.js";


const router = express.Router();

router.route("/add").post(isAuthenticated, addToSave);
router.route("/get").get(isAuthenticated,fetchSaveItems);
router.route("/delete/:jobId").delete(isAuthenticated,deleteSaveItem);
export default router;
