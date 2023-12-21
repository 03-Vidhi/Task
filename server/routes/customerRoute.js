import express from "express";
import {createData, deleteData, getData, updateData} from "../controllers/CustomerController.js"

const router = express.Router();

router.get("/getData", getData);
router.post("/createData", createData);
router.put("/updateData/:id",updateData);
router.delete("/deleteData/:id", deleteData)

export default router;