/**
 * Derived from the aws-serverless-express basic-starter example
 * https://github.com/awslabs/aws-serverless-express/blob/master/examples/basic-starter/lambda.js
 */
import * as awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';

import { app } from './express/app';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below, then redeploy (`npm run package-deploy`)
const binaryMimeTypes = [
  'application/javascript',
  'application/json',
  'application/octet-stream',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];
const server = awsServerlessExpress.createServer(app, undefined, binaryMimeTypes);

export const express: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
