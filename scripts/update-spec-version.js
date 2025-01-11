const YAML = require('yaml')
const fs = require('fs')
const OpenAPIBasePath = './openapi.yml'

if(process.argv.length < 3) {
    console.error('Error: Missing required argument - new version number.');
    process.exit(1); // Exit with an error code
}

try {
    const file = fs.readFileSync(OpenAPIBasePath, 'utf-8');
    const parsed = YAML.parse(file);

    if(parsed?.info?.version) {
        parsed.info.version = process.argv[2];
        const modified = YAML.stringify(parsed);
        fs.writeFileSync(OpenAPIBasePath, modified);
        console.log(`Successfully updated version to ${parsed.info.version}`);
    } else {
        console.warn('Warning: "info.version" property not found in OpenAPI specification.');
    }
} catch(error) {
    console.error('Error:', error.message);
    process.exit(1); // Exit with an error code
}