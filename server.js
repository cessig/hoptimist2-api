/* External Imports */
const express = require("express");
const cors = require("cors");

/* Internal Imports */
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

/* JSON Parsing */
app.use(express.json());
app.use(cors());

// Api routes
// Auth Routes
app.use("/api/v1/auth", routes.auth);

// Beer Routes
//app.use("/api/v1/beers", routes.beer);

// Brewery Routes
//app.use("api/v1/breweries", routes.brewery);

/* Server Listener */

app.listen(PORT, () => {
	console.log(`Listening at ${PORT}`);
});
