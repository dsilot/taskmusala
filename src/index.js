const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

//routes import
const gatewayRoutes = require('./routes/gatewayRoutes');
const peripheralRoutes = require ('./routes/peripheralRoutes');

//dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use('/api/v1/gateway', gatewayRoutes);
app.use('/api/v1/peripheral', peripheralRoutes);


app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});