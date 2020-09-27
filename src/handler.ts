import { APIGatewayProxyEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import 'source-map-support/register';

import { createLogger } from './logger';

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
