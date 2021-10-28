import handler from "../util/handler"
import dynamoDb from "../util/dynamodb"
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { GetItemInput } from "aws-sdk/clients/dynamodb"

export const main = handler(async (event: any) => {

  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      accountId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      ticketId: event.pathParameters?.id, // The id of the note from the path
    },
  } as GetItemInput

  const result = await dynamoDb.get(params)
  if (!result.Item) {
    throw new Error("Item not found.")
  }

  // Return the retrieved item
  return result.Item
})
