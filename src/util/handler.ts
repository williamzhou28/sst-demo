import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Context } from "aws-lambda"
import { StatusCode } from 'status-code-enum'

interface ErrorResult {
  error: string
}

export default function handler<T>(lambda: (event: APIGatewayProxyEventV2, data: any, context: Context) => Promise<any>) {
  return async function (event: APIGatewayProxyEventV2, context: Context) {
    let body: APIGatewayProxyResultV2 | ErrorResult
    let statusCode: StatusCode
    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = event.body ? JSON.parse(event.body) as T : undefined

    try {
      // Run the Lambda
      body = await lambda(event, data, context)
      statusCode = 200
    } catch (e) {
      console.error(e)
      body = { error: e instanceof Error ? e.message : String(e) }
      statusCode = 500
    }

    // Return HTTP response
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    }
  }
}
