import express from "express";
import { sendMessage , deleteMessage } from "../controller/contactController.js";


const router = express.Router();

router.post("/sendmessage", sendMessage)
router.delete("/:id", deleteMessage);


export default router;
