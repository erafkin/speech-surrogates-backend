import mongoose, { Schema } from 'mongoose';

const MapParameterSchema = new Schema({
    parameter: String,
    values: Array,
}, {collection: "map_parameters"});

MapParameterSchema.set('toJSON', {
  virtuals: true,
});

const MapParameter = mongoose.model('MapParameter', MapParameterSchema);


export default MapParameter;
