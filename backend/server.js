const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const rfcRoutes = require("./route/rfcRoutes");
const reportRoute = require("./route/reportRoutes");
const userRoute = require("./route/userRoute");
const adminRoute = require("./route/adminRoute")
const dashboardRoute = require("./route/dashboardRoute")
const mobileRoute = require("./route/mobileRoute")

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", rfcRoutes);
app.use("/api", reportRoute);
app.use("/api", userRoute);
app.use("/api", adminRoute)
app.use("/api", dashboardRoute)
app.use("/api", mobileRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
