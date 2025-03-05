export interface Transaction {
  id: string
  blockNumber: string
  timestamp: string
  from: string
  to: string
}

export interface ClPool {
  id: string
}

export interface Token {
  id: string
  symbol: string
  name: string
  decimals: string
  totalSupply: string
  volume: string
  volumeUSD: string
  feesUSD: string
  txCount: string
  poolCount: string
  totalValueLocked: string
  priceUSD: string
}

export interface ClMint {
  id: string
  transaction: Transaction
  pool: ClPool
  token0: Token
  token1: Token
  owner: string
  sender: string
  origin: string
  amount: string
  amount0: string
  amount1: string
  amountUSD: string
  tickLower: string
  tickUpper: string
  logIndex: string
}
