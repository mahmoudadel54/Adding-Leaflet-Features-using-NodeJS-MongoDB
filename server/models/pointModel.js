const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    properties:{
        name: String,
        population:Number,
    },
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], 
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  });

  
const PointModel = mongoose.model('Point', pointSchema)


module.exports = PointModel;