import express from "express";
import { newUser , allUsers , deleteUsers} from "../controller/userDataController.js";


const router = express.Router();

router.post("/newuser", newUser);
router.get("/allusers", allUsers);
router.delete("/:id",deleteUsers)



export default router;