import * as sst from "@serverless-stack/resources"

export default class ApolloApiStack extends sst.Stack {
  public api: sst.ApolloApi
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    // Create the API
    this.api = new sst.ApolloApi(this, "ApolloApi", {
      server: "src/graphql/apollo.handler",
      // defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      // cors: true,
    })

    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    })
  }
}
