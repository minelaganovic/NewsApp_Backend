const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
var multer = require('multer');

require('colors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes.js');
const newsRouter = require('./routes/newsRoutes.js');
const categoryRoute = require('./routes/categoryRoutes');

const morgan = require('morgan');
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
//app.use(cors());

app.use('/api/users', userRoutes);

app.use(express.static('public'));
app.use(express.static('data/uploads'));

app.use('/api', newsRouter);
app.use('/api/category', categoryRoute);

app.get('*', function(req, res){
  res.status(404).json({
    msg: "Api path not found."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.red,
  ),
);
