const express = require("express");
const router = express.Router();
const cuisinesModel = require("../models/cuisinesModel")

router.get("/country/:country",async(req,res)=>{
    const country = req.params.country;
    const data = await cuisinesModel.find({country})
  });

module.exports = router;