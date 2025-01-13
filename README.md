## API Documentation and Code Generation - Devstream

This project uses Redocly and OpenAPI Generator to manage API documentation and generate client (TypeScript using fetch API) / server (Spring Boot) code with the help of [OpenAPI Generator CLI](https://openapi-generator.tech/docs/generators).

Prior to codegen using node as a backend, stub generation was a part within the Gradle build system for the [`devstream-core`](https://github.com/AdityaMayukhSom/devstream-core) repository. For a detailed guide about code generation using Gradle, consider referencing [Sam's Programming Notes](https://blog.samzhu.dev/2021/05/26/How-to-automatically-generate-interface-and-Data-Transfer-Object-from-OpenAPI-yaml-file/), which explores how to integrate codegen with Gradle.

### Running Swagger Documentation in a Container:

In case you need to run swagger documentation inside a container, you can build the openapi json file and run the following command to start swagger documentation in port 8002.

```bash
npm run openapi:rebuild-docs
podman run \
    -p 8002:8080 \
    -e SWAGGER_JSON=/openapi-specs/openapi.json \
    -v ./build/docs/html:/openapi-specs \
    swaggerapi/swagger-ui
```

**[Reference Dockerfile for swaggerapi/swagger-ui](https://github.com/swagger-api/swagger-ui/blob/master/Dockerfile)**

## Workflow Scripts

The following npm scripts are available for working with the OpenAPI specification after installing required packages with `npm ci`:

1.  **`npm run get-version`:** Prints the current version from `package.json`.
2.  **`npm run openapi:lint`:** Lints the bundled OpenAPI specification (`./build/devstream.yml`) using Redocly and outputs results in a codeframe format.
3.  **`npm run openapi:build`:** Bundles the OpenAPI specification (`openapi.yml`) into a single YAML file (`./build/devstream.yml`). This is required before other OpenAPI-related tasks.
4.  **`npm run openapi:build-json`:** Bundles the OpenAPI specification (`openapi.yml`) into a single JSON file (`./build/devstream.json`).
5.  **`npm run openapi:preview`:** Starts a local preview server for the OpenAPI documentation using Redocly.
6.  **`npm run openapi:validate`:** Validates the bundled OpenAPI specification (`./build/devstream.yml`) using OpenAPI Generator CLI with recommendations.
7.  **`npm run openapi:mint`:** Runs the build, lint, and validate steps sequentially to ensure the specification is valid before generating code (`npm run openapi:build && npm run openapi:build-json && npm run openapi:lint && npm run openapi:validate`). The build step produces both JSON and YAML specifications.
8.  **`npm run openapi:generate-server`:** Generates server-side code (Spring) using OpenAPI Generator CLI and the configuration file `./config/config-server.yml`. It sets the artifact version using the npm package version.
9.  **`npm run openapi:generate-client`:** Generates client-side code (TypeScript Axios) using OpenAPI Generator CLI and the configuration file `./config/config-client.yml`. It sets the npm version using the npm package version.
10. **`npm run openapi:client-dist`:** Changes directory to `./build/client/typescript`, installs npm dependencies, and builds the client (`cd ./build/client/typescript && npm install && npm run build`).
11. **`npm run openapi:docs`:** Generates API documentation using OpenAPI Generator CLI and outputs it to `./docs`.
12. **`npm run openapi:cpp-pistache-server`:** Generates C++ Pistache server code using OpenAPI Generator CLI and outputs it to `./build/server/pistache`.
13. **`npm run openapi:go`:** Generates Go server code using OpenAPI Generator CLI and the configuration file `./config/config-go.yml`. It sets the package version using the npm package version.
14. **`npm run openapi:python-fastapi`:** Generates Python FastAPI server code using OpenAPI Generator CLI and outputs it to `./build/server/fastapi`.
15. **`npm run openapi:python-flask`:** Generates Python Flask server code using OpenAPI Generator CLI and outputs it to `./build/server/flask`.
16. **`npm run openapi:aspnetcore`:** Generates ASP.NET Core code using OpenAPI Generator CLI and the configuration file `./config/config-aspnetcore.yml`. It sets the package version using the npm package version.
17. **`npm run openapi:node-express`:** Generates Node.js Express server code using OpenAPI Generator CLI and outputs it to `./build/server/express`.
18. **`npm run openapi:stubs`:** Generates both server and client code (`npm run openapi:generate-server && npm run openapi:generate-client`).
19. **`npm run openapi:rebuild-stubs`:** Runs the full OpenAPI workflow (build, lint, validate, generate server, generate client) (`npm run openapi:mint && npm run openapi:stubs`).
20. **`npm run openapi:rebuild-docs`:** Runs the full OpenAPI workflow (build, lint, validate, generate docs) (`npm run openapi:mint && npm run openapi:docs`).
21. **`npm run prepare`:** Installs husky for git hooks (`husky install`). This typically runs automatically after first `npm install`.

## Scripts:

1. `ogen.ps1` is used to generate the golang server stub with [ogen](https://github.com/ogen-go/ogen). This uses podman to run the build step inside a container. Generated outputs are mapped to host computer using volumes. The configuration can be found in `./config/ogen.yml`.

## Note:

1. [https://github.com/vuejs/vitepress/issues/3057](https://github.com/vuejs/vitepress/issues/3057): the vitepress base url is set to `/client` in the `package.json` file to serve static assets, in case in future, we plan to serve the client document from some other route via changing the folder to which the generated docs are uploaded in the `devstream-docs` repository, we will also need to change the base route for vitepress.
