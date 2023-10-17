require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const noteRouter = require("./routes/noteRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/notes", noteRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Connect to MongoDB

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error)); // if there's an error when connecting to db
db.once("open", () => console.log("Connected to the Database"));
