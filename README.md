## API Documentation and Code Generation - Devstream

This project uses Redocly and OpenAPI Generator to manage API documentation and generate client (TypeScript using fetch API) / server (Spring Boot) code with the help of [OpenAPI Generator CLI](https://openapi-generator.tech/docs/generators).

## OpenAPI Workflow

The following npm scripts are available for working with the OpenAPI specification after istallinng required packages with `npm ci`:

1.   **`npm run openapi:build`:** Bundles the OpenAPI specification (`openapi.yml`) into a single file (`./build/devstream.yml`). This is required before other OpenAPI-related tasks.
2.   **`npm run openapi:lint`:** Lints the bundled OpenAPI specification (`./build/devstream.yml`) using Redocly and outputs results in a codeframe format.
3.   **`npm run openapi:validate`:** Validates the bundled OpenAPI specification (`./build/devstream.yml`) using OpenAPI Generator CLI with recommendations.
4.   **`npm run openapi:preview`:** Starts a local preview server for the OpenAPI documentation using Redocly.
5.   **`npm run openapi:mint`:** Runs the build, lint, and validate steps sequentially. This ensures the specification is valid before generating code.
6.   **`npm run openapi:generate-server`:** Generates server-side code (Spring interfaces and DTOs) using OpenAPI Generator CLI and the configuration file `./config/config-server.yml`.
7.   **`npm run openapi:generate-client`:** Generates client-side code (TypeScript fetch) using OpenAPI Generator CLI and the configuration file `./config/config-client.yml`.
8.   **`npm run openapi:stubs`:** Generates both server and client code (`npm run openapi:generate-server && npm run openapi:generate-client`).
9.   **`npm run openapi:rebuild-stubs`:** Runs the full workflow: builds, lints, validates, and then generates both server and client code (`npm run openapi:mint && npm run openapi:stubs`).