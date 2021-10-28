import handler from "../util/handler"
import { ticketTypes } from './'

export const main = handler(async (event: any) => {
  return Promise.resolve(ticketTypes)
})
