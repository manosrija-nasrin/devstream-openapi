podman run --rm `
  --volume ".:/workspace" `
  ghcr.io/ogen-go/ogen:latest `
  -v `
  -clean `
  -color `
  -package openapi `
  -config workspace/config/ogen.yml `
  -target workspace/build/server/ogen `
  workspace/build/devstream.yml