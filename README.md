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
- Copy handler.ts and serverless.yml in from [aws-nodejs-typescript](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-typescript).
- Add dependencies introduced from copying in the handler implementation.
    - `npm install source-map-support`
    - `npm install -D @types/aws-lambda`
    - `npm install -D @types/node`
- Replace [serverless-webpack](https://www.npmjs.com/package/serverless-webpack) with [serverless-plugin-typescript](https://www.npmjs.com/package/serverless-plugin-typescript).
    - Replace serverless-webpack plugin with serverless-plugin-typescript in serverless configuration.
    - Remove webpack references from serverless configuration.
    - `npm install -D serverless-plugin-typescript`

### Linting
- Add the [eslint](https://eslint.org/) to the project. `npm install eslint`
    - [Configuring ESLint](https://eslint.org/docs/user-guide/configuring)
    What configuration file format is recommended (javascript, json, yaml)? The documentation has examples in json.
- Create the default eslint configuration. `npx eslint --init`
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
- [How do I configure my project to use typescript-eslint?](https://github.com/typescript-eslint/typescript-eslint#how-do-i-configure-my-project-to-use-typescript-eslint)
    - [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser)
    - [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin)
