import express from "express";
import { newUser , allUsers , updateUser , deleteUsers, adminLogin } from "../controller/userDataController.js";


const router = express.Router();

router.post("/newuser", newUser);
router.get("/allusers", allUsers);
router.put('/update/:id',updateUser)
router.delete("/:id",deleteUsers);
router.post("/admin",adminLogin);




export default router;