import mongoose, { Schema , InferSchemaType , Model} from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},
{ timestamps: true }
)

export type IPost = InferSchemaType<typeof postSchema>;
const Post: Model<IPost> = mongoose.model('Post', postSchema);
export default Post;