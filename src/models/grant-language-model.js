import mongoose, { Schema } from 'mongoose';

const GrantLanguageSchema = new Schema({
   name: String,
   blurb: String,
   multimedia: Array,
}, {collection: "grant-languages"});

GrantLanguageSchema.set('toJSON', {
  virtuals: true,
});

const GrantLanguage = mongoose.model('GrantLanguage', GrantLanguageSchema);


export default GrantLanguage;