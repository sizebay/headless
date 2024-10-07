# Development

## Requirements

- Deno: https://deno.land/ to run the project
- Node: https://nodejs.org/en/ to run the deployment script
- Biome: https://biomejs.dev/ to format the code
- _Optional_: Deno extensions for VSCode: https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno

## Local development

```sh
deno run dev # runs the project in watch mode, allowing you to make changes to the code and see the results in real time. Can be useful for local examples and live testing.
deno run test # runs the tests.
deno run format # formats the code. It uses biome out of the box.
```

## Deployment

In order to perform a deployment, we need to codemod the project to a Node-JS UMD module. This is done by running the following command:

```sh
deno run deploy.sh <VERSION>
```

Where `<VERSION>` is the version of the package you want to deploy. You must follow the [semantic versioning](https://semver.org/) format.

`deploy.sh` calls the `instructions.ts` script, which generates the deployment files and copies the README to the npm folder, using Deno's DNT module. Next, it publishes the package to the npm registry. You can always tweak and change which instructions are given to Deno by simply editing the `instructions.ts` file. It's a good idea to check the [Deno documentation](https://deno.land/manual/tools/scripting) for more information.

PS: make sure you have the necessary permissions to publish to the npm registry. You can check your logged in user's permissions by running `npm whoami`.
