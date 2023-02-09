const app = require("../app");
const route = require("../routes/admin");

app.use("/api/", route);

module.exports = app;