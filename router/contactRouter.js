import express from "express";
import { sendMessage ,updateMessage, deleteMessage , getMessages} from "../controller/contactController.js";


const router = express.Router();

router.post("/sendmessage", sendMessage)
router.put("/update/:id", updateMessage)
router.delete("/:id", deleteMessage);
router.get("/messages",getMessages);


export default router;
