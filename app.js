const express = require("express");
// const path = require("path");
const app = express();
// const logger = require("./middleware/logger");

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Init middleware
// app.use(logger);

// Set a Static Folder
// app.use(express.static(path.join(__dirname, "public")));4

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Group routes/Member API
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
