const express = require("express");
const router = express.Router();
const { spawn } = require("child_process"); 

router.post("/generate", (req, res) => {
    const data = req.body.ingredients.join(","); 
    const pythonProcess = spawn("python", ["predict.py", data]);
    pythonProcess.stdout.on("data", (data) => {
      try {
        const predictedRecipe = JSON.parse(data.toString());
        res.json({ predictedRecipe });

      } catch (error) {
        console.error(`Error parsing Python script output: ${error}`);
        res.status(500).send("An error occurred while processing your request.");

      }
    });
   
  
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python script error: ${data}`);
      res.status(500).send("An error occurred while processing your request.");
    });
  
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        if (!res.headersSent) {
          res.status(500).send("An error occurred while processing your request.");
        }
      }
    });
  });
  
  module.exports = router;