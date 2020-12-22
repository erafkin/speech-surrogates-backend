import mongoose, { Schema } from 'mongoose';

const GrantLanguageSchema = new Schema({
	name: String,
	sections: [{
		title: String,
		blurb: String,
		multimedia: [{
			blurb: String,
			link: String,
		}],
	}],

}, { collection: 'grant-languages' });

GrantLanguageSchema.set('toJSON', {
	virtuals: true,
});

const GrantLanguage = mongoose.model('GrantLanguage', GrantLanguageSchema);


export default GrantLanguage;
