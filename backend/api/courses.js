const app = require("../app");
const route = require("../routes/courses");

app.use("/api/", route);

module.exports = app;