# CDKFT Local Docker

Provides an easy to use interface for building (and pushing) local docker images when working with CDKTF.

## Supported Languages

Currently only typescript is supported

## Missing features

- Handle docker login through provider

## Usage

```ts
import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { Container, DockerProvider } from "@cdktf/provider-docker";
import { DockerAsset } from "cdktf-local-docker";
import * as path from "path";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new DockerProvider(this, "provider", {});

    const localImage = new DockerAsset(this, "my-local-docker-image", {
      path: path.resolve(__dirname, "../backend"),
      name: "DanielMSchmidt/mybackend:latest",
      push: true
    });

    new Container(this, "my-container", {
      name: "my-container",
      image: localImage.name,
      ports: [{ external: 1234, internal: 80 }],
      rm: true,
    });
  }
}

const app = new App();
new MyStack(app, "local-docker-project");
app.synth();
```

## License

MIT
