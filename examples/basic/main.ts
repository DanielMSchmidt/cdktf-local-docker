import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { Container, DockerProvider } from "@cdktf/provider-docker";
import { DockerAsset } from "cdktf-local-docker";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);
    new DockerProvider(this, "provider", {});

    const localImage = new DockerAsset(this, "my-local-docker-image", {
      path: __dirname,
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