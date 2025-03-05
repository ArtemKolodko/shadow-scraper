import {GetEventsParams} from "./index";

export const getDepositsQuery = (params: GetEventsParams) => {
  const { first, skip, poolSymbol } = params

  return `{
    clMints(
      first: ${first}
      skip: ${skip}
      orderDirection:asc,
      orderBy:transaction__blockNumber,
      where:{
        pool_:{
          symbol: "${poolSymbol}"
        }
      }
    ) {
      id
      transaction {
        id
        blockNumber
        timestamp
      }
      owner
      origin
      amount0
      amount1
      token0 {
        id
        name
        symbol
      }
      token1 {
        id
        name
        symbol
      }
      pool {
        id
        symbol
      }
    }
  }`
}
