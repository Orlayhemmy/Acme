import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import userRoute from './apiRoutes/routes';


const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicpath: webpackConfig.output.publicPath,
  stats: { colors: true },
  noInfo: true,
}));
app.use(express.static(path.join(__dirname, '../template/Public')));
app.use(webpackHotMiddleware(compiler));

// app.get('*/', (req, res) => {
//   res.send('hello world');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', userRoute);

app.all('*/', (req, res) => res.status(404).send({ error: 'page not found' }));

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
  console.log(`App started on port ${app.get('port')}`);
});


export default app;