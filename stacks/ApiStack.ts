import * as sst from "@serverless-stack/resources"

export default class ApiStack extends sst.Stack {
  public api: sst.Api
  constructor(scope: sst.App, id: string, table: sst.Table, props?: sst.StackProps) {
    super(scope, id, props)

    // Create the API
    this.api = new sst.Api(this, "Api", {
      defaultAuthorizationType: sst.ApiAuthorizationType.AWS_IAM,
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      cors: true,
      routes: {
        "POST   /tickets": "src/tickets/purchase.main",
        "GET    /tickets": "src/tickets/my-tickets.main",
        "GET    /tickets/{id}": "src/tickets/get.main",
        "PUT    /tickets/{id}": "src/tickets/update.main",
        "DELETE /tickets/{id}": "src/tickets/delete.main",
        "GET    /ticket-types": "src/tickets/types.main",
      },
    })

    // Allow the API to access the table
    this.api.attachPermissions([table])
    // Show the API endpoint in the output
    this.addOutputs({
      ApiEndpoint: this.api.url,
    })
  }
}
