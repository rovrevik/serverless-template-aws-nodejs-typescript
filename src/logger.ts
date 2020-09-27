import Logger from 'bunyan';
import PrettyStream from 'bunyan-prettystream';

export function createLogger(name: string): Logger {
    // https://github.com/trentm/node-bunyan#constructor-api
    const options: Logger.LoggerOptions = {
        name,
        // streams?: Stream[];
        // https://github.com/trentm/node-bunyan#levels
        // level?: LogLevel;
        level: Logger.INFO,
        // stream?: NodeJS.WritableStream;
        // https://github.com/trentm/node-bunyan#serializers
        // serializers?: Serializers;
        // https://github.com/trentm/node-bunyan#src
        // src?: boolean;
        // [custom: string]: any;
    };

    if (process.env.IS_OFFLINE) {
        const prettyStdOut = new PrettyStream();
        prettyStdOut.pipe(process.stdout);
        options.stream = prettyStdOut;
    }

    return Logger.createLogger(options);
}
