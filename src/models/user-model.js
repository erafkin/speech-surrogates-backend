import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: String, 
    password: String, 
    last_name: String,
    first_name: String,
    type: String,  //admin, contributer, none
    bio: String,
}, {collection: "users"});

UserSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('User', UserSchema);


export default User;