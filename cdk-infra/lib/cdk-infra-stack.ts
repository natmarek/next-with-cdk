import * as cdk from "@aws-cdk/core";
import * as codecommit from "@aws-cdk/aws-codecommit";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as amplify from "@aws-cdk/aws-amplify";

export class CdkInfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const amplifyNextAppRepo = new codecommit.Repository(
      this,
      "AmplifyNextRepo",
      {
        repositoryName: "amplifyNextAppRepo",
        description:
          "Next.js app repository that will be used as the source repository for amplify and cdk app",
      }
    );

    const helloCDK = new lambda.Function(this, "HelloCDKHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "hellocdk.handler",
    });

    new apigw.LambdaRestApi(this, "Endpoint", {
      handler: helloCDK,
    });

    const amplifyApp = new amplify.App(this, "amplifyNextApp", {
      sourceCodeProvider: new amplify.CodeCommitSourceCodeProvider({
        repository: amplifyNextAppRepo,
      }),
    });
    amplifyApp.addBranch("main");
  }
}
