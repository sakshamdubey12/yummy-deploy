// const express = require("express");
// const router = express.Router();
// const { spawn } = require("child_process"); 

// router.post("/generate", (req, res) => {
//     const data = req.body.ingredients.join(","); 
//     const pythonProcess = spawn("python", ["predict.py", data]);
//     pythonProcess.stdout.on("data", (data) => {
//       try {
//         const predictedRecipe = JSON.parse(data.toString());
//         res.json({ predictedRecipe });

//       } catch (error) {
//         console.error(`Error parsing Python script output: ${error}`);
//         res.status(500).send("An error occurred while processing your request.");

//       }
//     });
   
  
//     pythonProcess.stderr.on("data", (data) => {
//       console.error(`Python script error: ${data}`);
//       res.status(500).send("An error occurred while processing your request.");
//     });
  
//     pythonProcess.on("close", (code) => {
//       if (code !== 0) {
//         console.error(`Python script exited with code ${code}`);
//         if (!res.headersSent) {
//           res.status(500).send("An error occurred while processing your request.");
//         }
//       }
//     });
//   });
  
//   module.exports = router;



const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/generate", (req, res) => {
    if (!req.body.ingredients || !Array.isArray(req.body.ingredients)) {
        return res.status(400).json({ error: "Invalid input. 'ingredients' must be an array." });
    }

    const data = req.body.ingredients.join(","); // Convert ingredients array to a comma-separated string
    const pythonProcess = spawn("python", ["predict.py", data]);

    let output = "";
    let errorOutput = "";

    // Collect standard output
    pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
    });

    // Collect standard error output
    pythonProcess.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
        if (code === 0) {
            try {
                const predictedRecipe = JSON.parse(output);
                return res.json({ predictedRecipe });
            } catch (error) {
                console.error(`Error parsing Python output: ${error.message}`);
                return res.status(500).json({ error: "Failed to parse the Python script output." });
            }
        } else {
            console.error(`Python script error: ${errorOutput}`);
            return res.status(500).json({
                error: "Python script encountered an error.",
                details: errorOutput.trim(),
            });
        }
    });
});

module.exports = router;
