const mongoose = require('mongoose');
let express = require('express');
let app = express();
let PORT = 7000;

mongoose.connect("mongodb://localhost:27017/ITIGIS41",
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }
,(err)=>{
    if (err) {
        //it is for exit connection in case of error
        console.log("error");
        console.error(err);
        process.exit();
      }
      console.log("Connection successfully");
      app.listen(PORT, () => {
        console.log(`app listening at http://localhost:${PORT}`);
      });
})

module.exports = app;