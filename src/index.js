import express from 'express';
//import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

//routes import
import gatewayRoutes from './routes/gatewayRoutes.js';
import peripheralRoutes from './routes/peripheralRoutes.js';

//dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//Routes
app.use('/api/v1/gateway', gatewayRoutes);
app.use('/api/v1/peripheral', peripheralRoutes);



app.listen(port, () => {
 console.log(`[server]: Server is running at https://localhost:${port}`);
});