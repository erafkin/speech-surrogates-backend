import mongoose, { Schema } from 'mongoose';

const MapLanguageSchema = new Schema({
   continent: String,
   country: String,
   language: String,
   instrument_family: String,
   instrument_type: String,
   contrasts_encoded: String,
   depth_of_encoding: String,
   content: String, 
   specialization: String,
   comprehension: String,
   productivity: String,
   summary: String,
   source: String,
   mentions: String,
}, {collection: "map-languages"});

MapLanguageSchema.set('toJSON', {
  virtuals: true,
});

const MapLanguage = mongoose.model('MapLanguage', MapLanguageSchema);


export default MapLanguage;