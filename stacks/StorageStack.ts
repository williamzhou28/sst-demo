import * as sst from "@serverless-stack/resources"

export default class StorageStack extends sst.Stack {
  public tickets: sst.Table

  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props)

    // Create the DynamoDB table
    this.tickets = new sst.Table(this, "Tickets", {
      fields: {
        accountId: sst.TableFieldType.STRING,
        ticketId: sst.TableFieldType.STRING,
        ticketType: sst.TableFieldType.STRING,
        startDate: sst.TableFieldType.STRING,
        endDate: sst.TableFieldType.STRING,
        cost: sst.TableFieldType.NUMBER,
      },
      primaryIndex: { partitionKey: "accountId", sortKey: "ticketId" },
    })
  }
}
