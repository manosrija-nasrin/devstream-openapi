Remove-Item -Path ./build -Recurse -Force
npm run openapi:mint
npm run openapi:generate-client
npm run openapi:generate-server
npm run openapi:generate-swagger
npm run openapi:client-docs