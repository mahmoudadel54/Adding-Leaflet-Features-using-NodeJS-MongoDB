const mongoose = require('mongoose');

const polygonSchema = mongoose.Schema({
  type: { type:String, default:"Feature" },
  properties:{
        name: String,
        population:Number,
    },
    geometry: {
        type: {
            type: String,
            enum: ['Polygon'],
            required: true
          },
          coordinates: {
            type: [[[Number]]], // Array of arrays of arrays of numbers
            required: true
          }
    }
})

const PolygonModel = mongoose.model('Polygon', polygonSchema)


  module.exports = PolygonModel;