const express = require("express");
const path = require("path");
const app = express();
const axios = require("./axios");

app.use(express.json());

app.post("/api", async (req, res) => {
  try {
    let response = await axios.post("/schedules/shifts", {
      ...req.body
    });
    let response2 = await axios.post("/schedules/shiftsSchedule", {
      ...req.body
    });

    res.status(201).json(response.data || response2.data);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});
// === DEFAULT === //

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

//For Production Environment
if (process.env.NODE_ENV === "production") {
  //Make sure express will serve production assets
  //set static folder, try to match the file name
  app.use(express.static("build"));

  //Express will serve up the index.html file if it does not recognize the file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
