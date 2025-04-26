import {getAllUsers} from '../controllers/userController.js';
import express from "express"; 

const router = express.Router();


router.get('/get', getAllUsers);


export default router;
