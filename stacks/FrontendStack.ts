import * as sst from "@serverless-stack/resources"

export default class FrontendStack extends sst.Stack {
  constructor(scope: sst.App, id: string, api: sst.Api, auth: sst.Auth, props?: sst.StackProps) {
    super(scope, id, props)

    // Define our React app
    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      // Pass in our environment variables
      environment: {
        REACT_APP_API_URL: api.url,
        REACT_APP_REGION: scope.region,
        // REACT_APP_BUCKET: bucket.bucketName,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool?.userPoolId || process.env.USER_POOL_ID || '',
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool?.ref || process.env.IDENTITY_POOL_ID || '',
        REACT_APP_USER_POOL_CLIENT_ID: auth.cognitoUserPoolClient?.userPoolClientId || process.env.USER_POOL_CLIENT_ID || '',
      },
    })

    // Show the url in the output
    this.addOutputs({
      SiteUrl: site.url,
    })
  }
}
