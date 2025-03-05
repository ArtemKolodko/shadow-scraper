import {GetEventsParams} from "./index";

export const getMintsQuery = (params: GetEventsParams) => {
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

export const getBurnsQuery = (params: GetEventsParams) => {
  const { first, skip, poolSymbol } = params

  return `{
    clBurns(
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
