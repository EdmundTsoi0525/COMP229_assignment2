/*
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'


const app = express()
app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app
*/

/*
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js'; // Import the product routes

const app = express();

app.get('/', (req, res) => {
    res.status(200).send(Template());
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes);
app.use('/products', productRoutes); // Use the product routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

export default app;
*/

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send(Template());
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use('/api', userRoutes); // ensure user routes have a base path
app.use('/api', productRoutes); // ensure product routes have a base path

app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}, Method: ${req.method}`);
    next();
});


export default app;
