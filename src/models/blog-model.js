import mongoose, { Schema } from 'mongoose';

const BlogSchema = new Schema({
   author: String,
   date: Date,
   title: String, 
   body: String,
   visible: Boolean,
}, {collection: "blogs"});

UserSchema.set('toJSON', {
  virtuals: true,
});

const Blog = mongoose.model('User', BlogSchema);


export default Blog;