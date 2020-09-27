import {
    AuthResponse, Context, CustomAuthorizerEvent, CustomAuthorizerHandler,
} from 'aws-lambda';
import _ from 'lodash';

// eslint-disable-next-line import/extensions
import { createLogger } from './logger';

export const authorizer: CustomAuthorizerHandler = async (event: CustomAuthorizerEvent, context: Context) => {
    const logger = createLogger(context.functionName);
    logger.info({ event }, 'handler.authorizer');
    // the authorization header
    // event.authorizationToken;

    // Arbitrarily allow call
    return createAuthResponse('userId', 'Allow', event.methodArn);
};

/**
 * Based on: Create an API Gateway Lambda Authorizer Function in the Lambda Console
 * https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html#api-gateway-lambda-authorizer-lambda-function-create
 */
function createAuthResponse(principalId: string, effect: string, resource: string): AuthResponse {
    if (!_.trim(principalId)) {
        throw new Error('createAuthResponse.principalId.length');
    }
    if (!_.trim(effect)) {
        throw new Error('createAuthResponse.effect.length');
    }
    if (!_.trim(resource)) {
        throw new Error('createAuthResponse.resource.length');
    }

    // if (effect && resource) {}
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
            stringKey: 'stringval',
            numberKey: 123,
            booleanKey: true,
        },
        // usageIdentifierKey?: string;
    };
}
