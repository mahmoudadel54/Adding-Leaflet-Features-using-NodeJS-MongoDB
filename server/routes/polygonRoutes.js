const polygonRouter = require('express').Router();
const PolygonModel = require("../models/polygonModel");

polygonRouter.post("/create",async(req,res,next)=>{
    try {
        console.log(req.body);
        const polygon = new PolygonModel(req.body);
        const createdpolygon = await polygon.save();
        if (createdpolygon) {
          res
            .status(201)
            .send({
              createdpolygon: createdpolygon,
              msg: "Created a new polygon",
              status: true,
            });
        } else {
          console.log("failed");
          res.status(404).send({ msg: "failed to create a polygon", status: false });
        }
      } catch (error) {
        console.log("failed");
        next(error);
      }
})

polygonRouter.get("/", async (req, res, next) => {
    try {
      const polygons = await PolygonModel.find({}, { _id: 0 });
      if (polygons.length) {
        res.send({
          polygons: polygons,
          status: true,
          msg: "get all polygons in geojson format",
        });
      } else {
        res.send({ msg: "there is no plot", status: false });
      }
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = {
    polygonRouter,
  };
  