import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
   author: String,
   date: Date,
   title: String, 
   body: String,
   visible: Boolean,
}, {collection: "blogs"});

BlogSchema.set('toJSON', {
  virtuals: true,
});

const Blog = mongoose.model('Blog', BlogSchema);


export default Blog;