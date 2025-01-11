const YAML = require('yaml');
const fs = require('fs');
const path = require('path');

let OpenAPIBasePath = './openapi.yml'; // Default path
let newVersion;

switch(process.argv.length) {
    case 3:
        newVersion = process.argv[2];
        break;
    case 4:
        OpenAPIBasePath = process.argv[2];
        newVersion = process.argv[3];
        break;
    default:
        console.error('Error:');
        console.error('Usage: node script.js <new_version> # uses default file as openapi.yml');
        console.error('Usage: node script.js <openapi_file> <new_version>');
        process.exit(1);
}

try {
    // Resolve the path to handle relative paths correctly
    const resolvedPath = path.resolve(OpenAPIBasePath);
    const file = fs.readFileSync(resolvedPath, 'utf-8');
    const doc = YAML.parseDocument(file);
    const infoNode = doc.get('info');

    if(infoNode && infoNode instanceof YAML.YAMLMap && infoNode.has('version')) {
        infoNode.set('version', newVersion);
        fs.writeFileSync(resolvedPath, doc.toString({}));
        console.log(`Successfully updated version in ${resolvedPath} to ${newVersion}`);
    } else {
        console.warn(`Warning: "info.version" property not found in OpenAPI specification at ${resolvedPath}.`);
    }
} catch(error) {
    console.error('Error:', error.message);
    process.exit(1);
}