/**
 * Derived from the aws-serverless-express basic-starter example
 * https://github.com/awslabs/aws-serverless-express/blob/master/examples/basic-starter/app.js
 */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { APIGatewayProxyEvent } from 'aws-lambda';
import _ from 'lodash';

// Ephemeral in-memory data store
interface User {
  id: number;
  name: string;
}

const users = [{ id: 1, name: 'Joe' }, { id: 2, name: 'Jane' }];
let userIdCounter = users.length;

const getUser = (userId: string): User|undefined => users.find((u) => u.id === parseInt(userId, 10));
const getUserIndex = (userId: string): number => users.findIndex((u) => u.id === parseInt(userId, 10));

export const app = express();
// Export your express server so you can import it in the lambda function.
// TODO module.exports = app;

const router = express.Router();

app.set('view engine', 'pug');

if (process.env.NODE_ENV === 'test') {
  // NOTE: aws-serverless-express uses this app for its integration tests
  // and only applies compression to the /sam endpoint during testing.
  router.use('/sam', compression());
} else {
  router.use(compression());
}

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(awsServerlessExpressMiddleware.eventContext());

// NOTE: tests can't find the views directory without this
app.set('views', path.join(__dirname, 'views'));

router.get('/', (req, res) => {
  const event: APIGatewayProxyEvent = _.get(req, 'apiGateway.event');
  const apiUrl = event ? `https://${event.headers.Host}/${event.requestContext.stage}` : 'http://localhost:3000';
  res.render('index', { apiUrl });
});

router.get('/sam', (req, res) => {
  res.sendFile(`${__dirname}/sam-logo.png`);
});

router.get('/users', (req, res) => {
  res.json(users);
});

router.get('/users/:userId', (req, res) => {
  const user = getUser(req.params.userId);

  if (!user) return res.status(404).json({});

  return res.json(user);
});

router.post('/users', (req, res) => {
  const user = {
    id: ++userIdCounter,
    name: req.body.name,
  };
  users.push(user);
  res.status(201).json(user);
});

router.put('/users/:userId', (req, res) => {
  const user = getUser(req.params.userId);
  if (!user) {
    res.status(404).json({});
  } else {
    user.name = req.body.name;
    res.json(user);
  }
});

router.delete('/users/:userId', (req, res) => {
  const userIndex = getUserIndex(req.params.userId);
  if (userIndex === -1) {
    res.status(404).json({});
  } else {
    users.splice(userIndex, 1);
    res.json(users);
  }
});

// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
// TODO export a function that creates the app and passes in the path, or just creates the router
app.use('/app/', router);
