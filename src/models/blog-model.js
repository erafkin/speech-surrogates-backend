import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
   author: String,
   date: Date,
   title: String, 
   body: String,
   visible: Boolean,
   keywords: Array, 
   comments: [{
     author: String, 
     body: String,
     date: Date, 
     visible: Boolean
   }],
}, {collection: "blogs"});

BlogSchema.set('toJSON', {
  virtuals: true,
});

const Blog = mongoose.model('Blog', BlogSchema);


export default Blog;