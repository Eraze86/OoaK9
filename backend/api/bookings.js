const app = require("../app");
const route = require("../routes/bookings");

app.use("/api/", route);

module.exports = app;