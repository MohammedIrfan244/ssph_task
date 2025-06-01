import express from 'express';
import { createPost, getPosts, getPostById, editPost, deletePost } from '../controllers/postController';
import auth from '../middlewares/auth';
import tryCatch from '../lib/utils/tryCatch';



const router = express.Router();
router.use(auth); 
router
.post('/create', tryCatch(createPost))
.get('/', tryCatch(getPosts))
.get('/:id', tryCatch(getPostById))
.put('/:id', tryCatch(editPost))
.delete('/:id', tryCatch(deletePost));

export default router;