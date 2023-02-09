const app = require("../app");
const route = require("../routes/dates");

app.use("/api/", route);

module.exports = app;