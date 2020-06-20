import mongoose, { Schema } from 'mongoose';

const KeywordSchema = new Schema({
    name: String,
    postCount: Number,
}, {collection: "keywords"});

KeywordSchema.set('toJSON', {
  virtuals: true,
});

const Keyword = mongoose.model('Keyword', KeywordSchema);


export default Keyword;