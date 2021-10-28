import handler from "../util/handler"
import dynamoDb from "../util/dynamodb"
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { QueryInput } from "aws-sdk/clients/dynamodb"

export const main = handler(async (event: any) => {

  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "accountId = :accountId",
    ExpressionAttributeValues: {":accountId": event.requestContext.authorizer.iam.cognitoIdentity.identityId},
  } as QueryInput

  const result = await dynamoDb.query(params)
  // Return the retrieved item
  return result.Items
})
