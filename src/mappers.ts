import {ClMint, MappedClMint} from "./types";

export const mapClMint = (event: ClMint): MappedClMint => {
  return {
    id: event.id,
    txHash: event.transaction.id,
    blockNumber: event.transaction.blockNumber,
    pool: event.pool.symbol,
    userAddress: event.origin,
    token0: event.token0.symbol,
    token1: event.token1.symbol,
    amount0: event.amount0,
    amount1: event.amount1,
  }
}

export const mapClBurn = (event: ClMint): MappedClMint => {
  return {
    id: event.id,
    txHash: event.transaction.id,
    blockNumber: event.transaction.blockNumber,
    pool: event.pool.symbol,
    userAddress: event.origin,
    token0: event.token0.symbol,
    token1: event.token1.symbol,
    amount0: event.amount0,
    amount1: event.amount1,
  }
}
