import {Ticket} from '../../tickets'

export const Query = async (root: any, args: any, ctx: any): Promise<Ticket[]> => {
  console.log(root, args, ctx)
  return Promise.resolve([])
}
