import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import userRoute from './apiRoutes/routes';


const app = express();


// app.get('*/', (req, res) => {
//   res.send('hello world');
// });
app.get('/', (req, res) => res.send({
  message: 'School Manager Server now Running',
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', userRoute);

app.all('*', (req, res) => res.status(404).send({ error: 'page not found' }));

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
  console.log(`App started on port ${app.get('port')}`);
});


export default app;