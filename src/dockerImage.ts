
import { Construct, } from "constructs";
import {  Resource, TerraformResource } from 'cdktf';
import { CustomDataSource } from './custom-data-source'

export interface IImage {
    digest: string;
  }

export interface DockerImageConfig {
  name: string,
  dependsOn?: TerraformResource[];
}

interface CustomDockerImageInput {
  name: string;
}

interface CustomDockerImageOutput {
  sha256Digest: string;
}

class CustomDockerImage extends CustomDataSource<CustomDockerImageInput, CustomDockerImageOutput> {};

export class DockerImage extends Resource implements IImage {
  public readonly data: CustomDockerImage;
  public readonly digest: string;
  public readonly url: string;

  constructor(scope: Construct, name: string, config: DockerImageConfig) {
    super(scope, name);


    this.data = new CustomDockerImage(this, 'fetchImage', {
      inputs: {
        name: config.name,
      },
      code: async (args) => {
        const drc = require('docker-registry-client')
        return new Promise((resolve, reject) => {
          var rar = drc.parseRepoAndRef((args as any).repositoryUrl);
          var client = drc.createClientV2({
            repo: rar,
            insecure: false,
            maxSchemaVersion: 2
          });
          var tagOrDigest = rar.tag || rar.digest;
          client.getManifest({ref: tagOrDigest}, function (err:any, _manifest:any, _res:any, manifestStr:any) {
            client.close();
            if (err) {
              reject(err)
            }
            resolve({sha256Digest: drc.digestFromManifestStr(manifestStr)});
          });
        });
      },
      dependsOn: config.dependsOn
    })

    this.digest = this.data.result("sha256Digest")
    this.url = `${config.name}@${this.digest}`
  }
}