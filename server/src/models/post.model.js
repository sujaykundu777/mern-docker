// Post.model.js
import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true
   },
   body: {
       type: String
   },
   author: {
       type: String
   }
});

const Post = mongoose.model("Post", postSchema);
export default Post;
