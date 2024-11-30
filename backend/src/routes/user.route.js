import { Router } from "express";
import { addNotes, loginUser, registerUser,updateNotes,deleteNotes, displayNotes } from "../controllers/user.controller.js";
import { authenticate } from "../Middlewares/auth.js";



const router=Router();
router.route("/").get(async(req,res)=>{
    return res.status(200).json({
       message: "Hello User" 
    })
})


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/addNote").post(authenticate,addNotes);
router.route("/displayNote").post(authenticate,displayNotes);
router.route("/updateNote").post(authenticate,updateNotes);
router.route("/deleteNote").post(authenticate,deleteNotes);






export default router;