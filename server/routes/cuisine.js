const express = require("express");
const router = express.Router();
const cuisinesModel = require("../models/cuisinesModel")

router.get("/country/:country",async(req,res)=>{
    const country = req.params.country;
    const data = await cuisinesModel.find({country})
    console.log(data)
    // if(!data[0].cuisines){
    //   res.status(404)
    // }
    // else{

    //   res.json(data[0].cuisines)
    //   console.log(data[0].cuisines)
    // }
  });

module.exports = router;