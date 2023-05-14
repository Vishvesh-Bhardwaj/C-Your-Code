const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const fs = require("fs");
const app = express();
app.use(cors());
app.use(express.json());
app.post("/execute", (req, res) => {
  console.log("Hitting api successfully");
  console.log(req.body);
  const fileName = "code.c";
  //define a variable to get the language id from the request body
  var languageId = req.body.language_id;
  let targetDir = "";
    switch (languageId) {
      case 1:
        targetDir = "./compiler-design-c-compiler/Lexical-Analyzer/testfiles/";
        break;
      // case 2:
      //   targetDir = "./compiler-design-c-compiler/Parser/testfiles/";
      //   break;
      // case 3:
      //   targetDir = "./compiler-design-c-compiler/Semantic-Analysis/testfiles/";
      //   break;
      case 2:
        targetDir = "./compiler-design-c-compiler/ICG/testfiles/";
        break;
      case 3:
        targetDir = "./compiler-design-c-compiler/Quadruple/testfiles/";
        break;
      case 4:
        targetDir = "./compiler-design-c-compiler/Triple/testfiles/";
        break;
      default:
        return res.status(400).json({ error: "Invalid phase selected" });
    }
  // Move the file from downloads directory to target directory
  fs.rename( fileName, targetDir + fileName, (err) => {
    if (err) throw err;
    console.log("File moved successfully");
    var scriptDir = "";
    switch (languageId) {
      case 1:
        scriptDir = "./compiler-design-c-compiler/Lexical-Analyzer/run.sh";
        break;
      // case 2:
      //   scriptDir = "./compiler-design-c-compiler/Parser/run.sh";
      //   break;
      // case 3:
      //   scriptDir = "./compiler-design-c-compiler/Semantic-Analysis/run.sh";
      //   break;
      case 2:
        scriptDir = "./compiler-design-c-compiler/ICG/run.sh";
        break;
      case 3:
        scriptDir = "./compiler-design-c-compiler/Quadruple/run.sh";
        break;
      case 4:
        scriptDir = "./compiler-design-c-compiler/Triple/run.sh";
        break;
      default:
        return res.status(400).json({ error: "Invalid phase selected" });
    }
    var data = "";
    const script = spawn("sh", [scriptDir]);
    script.stdout.on("data", (chunk) => {
      data += chunk;
    });
    script.stderr.on("data", (chunk) => {
      data += chunk;
    });
    script.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      switch (languageId) {
        case 1:
          targetDir = "./compiler-design-c-compiler/Lexical-Analyzer/output/";
          break;
        // case 2:
        //   targetDir = "./compiler-design-c-compiler/Parser/testfiles/";
        //   break;
        // case 3:
        //   targetDir = "./compiler-design-c-compiler/Semantic-Analysis/testfiles/";
        //   break;
        case 2:
          targetDir = "./compiler-design-c-compiler/ICG/Output/";
          break;
        case 3:
          targetDir = "./compiler-design-c-compiler/Quadruple/Output/";
          break;
        case 4:
          targetDir = "./compiler-design-c-compiler/Triple/Output/";
          break;
        default:
          return res.status(400).json({ error: "Invalid phase selected" });
      }
      const outputFilePath = `${targetDir}/output_file.txt`;
      fs.writeFile(outputFilePath, data, (err) => {
        if (err) throw err;
        console.log(`Output written to ${outputFilePath}`);
      });
      res.json({ output: data });
    });
  });
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
