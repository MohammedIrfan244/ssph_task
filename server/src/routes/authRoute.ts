import express from 'express';
import tryCatch from '../lib/utils/tryCatch';
import { register } from '../controllers/authController';



const router = express.Router();

router
.post("/registration", tryCatch(register))



export default router;