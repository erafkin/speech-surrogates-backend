import mongoose, { Schema } from 'mongoose';

const AboutSchema = new Schema({
    title: String,
    blurb: String,
}, {collection: "about"});

AboutSchema.set('toJSON', {
  virtuals: true,
});

const About = mongoose.model('About', AboutSchema);


export default About;