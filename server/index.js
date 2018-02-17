import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';


const app = express();

app.get('*/', (req, res) => {
  res.send('hello world');
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(4000, () => console.log('Running on localhost 4000'));