import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler, AuthResponse, Context,
  CustomAuthorizerEvent,
  CustomAuthorizerHandler,
} from 'aws-lambda';
import * as bunyan from 'bunyan';
import 'source-map-support/register';

export const hello: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  const logger = createLogger(context.functionName);
  logger.info({ event }, 'handler.hello');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };
};

export const authorizer: CustomAuthorizerHandler = async (event: CustomAuthorizerEvent, context: Context) => {
  const logger = createLogger(context.functionName);
  logger.info({ event }, 'handler.authorizer');
  // the authorization header
  // event.authorizationToken;

  // Arbitrarily allow call
  return createAuthResponse('userId', 'Allow', event.methodArn);
};

function createLogger(name: string): bunyan {
  // https://github.com/trentm/node-bunyan#constructor-api
  const options: bunyan.LoggerOptions = {
    name,
    // streams?: Stream[];
    // https://github.com/trentm/node-bunyan#levels
    // level?: LogLevel;
    level: bunyan.INFO,
    // stream?: NodeJS.WritableStream;
    // https://github.com/trentm/node-bunyan#serializers
    // serializers?: Serializers;
    // https://github.com/trentm/node-bunyan#src
    // src?: boolean;
    // [custom: string]: any;
  };
  return bunyan.createLogger(options);
}

/**
 * Based on: Create an API Gateway Lambda Authorizer Function in the Lambda Console
 * https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html#api-gateway-lambda-authorizer-lambda-function-create
 */
function createAuthResponse(principalId: string, effect: string, resource: string): AuthResponse {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      // Id?: string;
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      }],
    },
    // Optional context: demonstrate custom properties of the String, Number or Boolean type.
    context: {
      stringKey: "stringval",
      numberKey: 123,
      booleanKey: true,
    },
    // usageIdentifierKey?: string;
  };
}
