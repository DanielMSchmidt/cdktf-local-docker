import { Construct } from "constructs";
import { TerraformOutput, Resource } from 'cdktf';
import * as Null from "@cdktf/provider-null";
import * as hashdirectory from 'hashdirectory';
// import { DockerImage } from './dockerImage';

export interface IDockerAsset {
  name: string;
  workingDirectory: string;
  push: boolean;
}

export interface DockerAssetConfig {
  path: string;
  name: string;
  push: boolean;
}

export class DockerAsset extends Resource implements IDockerAsset {
  public readonly name: string;
//   public readonly fullName: string;
  public readonly workingDirectory: string;
  public readonly push: boolean;
//   public readonly buildAndPush: Null.Resource;
//   public readonly dockerImage: DockerImage;

  constructor(scope: Construct, name: string, config: DockerAssetConfig) {
    super(scope, name);

    this.workingDirectory = config.path
    this.name = config.name
    
    this.push = config.push

    // this.buildAndPush = new Null.Resource(this, 'buildAndPush', {
    //   triggers: {
    //     folderhash: hashdirectory.sync(this.workingDirectory),
    //     name: config.name
    //   }
    // });

    
    // this.dockerBuildCommand()

    // this.dockerImage = new DockerImage(this, 'image', {
    //   name: this.name,
    //   dependsOn: [this.buildAndPush]
    // })

    // this.fullName = this.dockerImage.url;
  }

//   protected addOutput(): void {
//     new TerraformOutput(this, 'docker-image-name', {
//       value: this.name
//     })
//   }

  protected dockerBuildCommand(): void {
    // const imageName = this.name;

    // const buildCmd = `cd ${this.workingDirectory} && docker build -t ${imageName} .`;
    // const pushCmd = `docker push ${imageName}`

    // const _command = (this.push ? [buildCmd, pushCmd]: [buildCmd] ).join("&&");
    // this.buildAndPush.addOverride('provisioner.local-exec.command', command);
  }
}