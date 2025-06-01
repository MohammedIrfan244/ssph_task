import express from 'express';
import { createPost, getPosts, getPostById, editPost, deletePost } from '../controllers/postController';
import auth from '../middlewares/auth';
import tryCatch from '../lib/utils/tryCatch';
import idValidation from '../middlewares/idValidation';



const router = express.Router();
router.use(auth); 
router
.post('/', tryCatch(createPost))
.get('/', tryCatch(getPosts))
.get('/:id', idValidation,tryCatch(getPostById))
.put('/:id', idValidation,tryCatch(editPost))
.delete('/:id',idValidation, tryCatch(deletePost));

export default router;