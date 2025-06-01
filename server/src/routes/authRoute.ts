import express from 'express';
import tryCatch from '../lib/utils/tryCatch';
import { register , login} from '../controllers/authController';



const router = express.Router();

router
.post("/register", tryCatch(register))
.post("/login", tryCatch(login)); 



export default router;