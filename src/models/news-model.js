import mongoose, { Schema } from 'mongoose';

const NewsSchema = new Schema({
	blurb: String,
	link: String,
}, { collection: 'news' });

NewsSchema.set('toJSON', {
	virtuals: true,
});

const News = mongoose.model('News', NewsSchema);


export default News;
