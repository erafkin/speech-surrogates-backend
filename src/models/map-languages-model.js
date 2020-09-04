import mongoose, { Schema } from 'mongoose';

const MapLanguageSchema = new Schema({
   continent: String,
   country: Array,
   language: String,
   instrument_family: String,
   instrument_type: String,
   encoding_medium: Array,
   contrasts_encoded: Array,
   depth_of_encoding: Array,
   content: Array, 
   specialization: Array,
   comprehension: String,
   productivity: String,
   summary: String,
   source: String,
   mentions: String,
   current_status: String,
   entry_authors: String,
}, {collection: "map-languages"});

MapLanguageSchema.set('toJSON', {
  virtuals: true,
});

const MapLanguage = mongoose.model('MapLanguage', MapLanguageSchema);


export default MapLanguage;