Serverless create template for AWS, nodejs and Typescript
=========================================================

### Globally installed NPM modules
- See what is installed globally. The following should execute without error.
    - `npm ls -g --depth=0`
- For the sake of convenience, the following are installed globally.
    - `npm install -g typescript`
    - `npm install -g ts-node` and potentially `ts-node-to`
    - `npm install -g serverless`

### Typescript
- Install [Typescript](http://www.typescriptlang.org/index.html) in the project `npm install typescript`
- Create a default [tsconfig.json](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for the project. `npx tsc --init`
    - [Compiler Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html) `--init`

### Compare the output from various serverless project generators
- `serverless create -t aws-nodejs` versus `serverless create -t aws-nodejs-typescript`
- The plain `aws-nodejs` template produces a serverless.yml file with several examples for different event types and cloudformation resources.
- The project templates do not seem to universally be the gold-standard for project creation.
- TODO what would be required to create ones own template that could be used with `create --template`?
    - The create templates are in the serverless repository. 
        - [aws-nodejs](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs)
        - [aws-nodejs-typescript](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-typescript)
        - [aws-nodejs-ecma-script](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-ecma-script)
    - The serverless create commands support the template url option `create --template-url`

### Update generated aws-nodejs-typescript/serverless-webpack to use serverless-plugin-typescript
- update the serverless.yml
    - replace `serverless-webpack` with `serverless-plugin-typescript` in the plugins section
    - remove webpack under the custom section 
- update the package-json
    - remove `serverless-webpack` dev dependencies from the package.json
        - serverless-webpack
        - fork-ts-checker-webpack-plugin
        - ts-loader
        - webpack
        - webpack-node-externals
    - keep `source-map-support` dependency in the package.json.
        Adding `import 'source-map-support/register';` in the handler file still has value when using
        `serverless-plugin-typescript`.
 - Update the tsconfig.json.
    > The outDir and rootDir options cannot be overwritten.
    - `outDir`: ".build",
    - `rootDir`: "./"

### Serverless
- Install serverless into the project. `npm install -D serverless`
- Update the tsconfig.json compiler options to target es2017.
- Copy handler.ts and serverless.yml in from
 [aws-nodejs-typescript](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-typescript).
- Add dependencies introduced from copying in the handler implementation.
    - `npm install source-map-support`
    - `npm install -D @types/aws-lambda`
    - `npm install -D @types/node`
- Replace [serverless-webpack](https://www.npmjs.com/package/serverless-webpack) with
 [serverless-plugin-typescript](https://www.npmjs.com/package/serverless-plugin-typescript).
    - Replace serverless-webpack plugin with serverless-plugin-typescript in serverless configuration.
    - Remove webpack references from serverless configuration.
    - `npm install -D serverless-plugin-typescript`

### Linting
- Add the [eslint](https://eslint.org/) to the project. `npm install eslint`
    - [Configuring ESLint](https://eslint.org/docs/user-guide/configuring)
    What configuration file format is recommended (javascript, json, yaml)?
    The documentation has examples in json.
    Going with js so that comments can added and jest uses js by default.
- Create the default eslint configuration.
    - `%npx eslint --init`
        - How would you like to use ESLint? `To check syntax, find problems, and enforce code style`
        - What type of modules does your project use? `JavaScript modules (import/export)`
        - Which framework does your project use? `None of these`
        - Does your project use TypeScript? `Yes`
        - Where does your code run? `Node`
        - How would you like to define a style for your project? `Use a popular style guide`
        - Which style guide do you want to follow? `Airbnb (https://github.com/airbnb/javascript)`
        - What format do you want your config file to be in? `JavaScript`
    - peerDependencies of eslint-config-airbnb-base@latest for selected configuration.
        The config that you've selected requires the following dependencies:
        - [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
        - [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
        - [eslint](https://www.npmjs.com/package/eslint) (installed 6+)
        - [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
            - Add `plugin:import/typescript` to extends in `.eslintrc.yml`
        - [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
    - Creates .eslintrc.js file
- Add `plugin:@typescript-eslint/recommended` to extends in `.eslintrc.yml`
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint):
 Monorepo for all the tooling which enables ESLint to support TypeScript
- [How do I configure my project to use typescript-eslint?](https://github.com/typescript-eslint/typescript-eslint#how-do-i-configure-my-project-to-use-typescript-eslint)
    - [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)
    - [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
- [basarat - ESLint](https://basarat.gitbooks.io/typescript/docs/tools/eslint.html)
- Install and configure [eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest).
    - `npm install -D eslint-plugin-jest`
    - Add `jest: true` to env in `.eslintrc.yml`  
    - Add `'plugin:jest/recommended', 'plugin:jest/style'` to extends in `.eslintrc.yml`
    - Add `'jest'` to plugins in `.eslintrc.yml`

### Testing
- Install [Jest](https://jestjs.io). `npm install -D jest`
- Install @types/jest. `npm install -D @types/jest`
- Install [ts-jest](https://kulshekhar.github.io/ts-jest/). `npm install -D ts-jest`
- Create the default Jest configuration (jest.config.js is created by default). `npx ts-jest config:init` 

### Serverless Offline
- Install [serverless-offline](https://www.npmjs.com/package/serverless-offline)
 `npm install -D serverless-offline`
- Add serverless-offline to the end of the plugins section of the serverless.yml (needs to be last in the list). 

### Custom Authorizer
 - [Introducing custom authorizers in Amazon API Gateway](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/)
 - [Use API Gateway Lambda Authorizers](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)
 - [HTTP Endpoints with Custom Authorizers](https://serverless.com/framework/docs/providers/aws/events/apigateway/#http-endpoints-with-custom-authorizers)
 
### Bunyan logger 
- Install [Bunyan](https://www.npmjs.com/package/bunyan). `npm install bunyan`
- Install [Bunyan](https://www.npmjs.com/package/bunyan). `npm install -D @types/bunyan`

### TODO
- prettier
