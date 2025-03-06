import {bootstrapDb} from "../db";
import {MappedClBurn, MappedClMint} from "../types";
import {getTokensPrice, CoinGeckoTokensMap} from "../api/coingecko";

const main = async () => {
  const db = bootstrapDb()

  let token0Amount = 0
  let token0AmountUsd = 0
  let token1Amount = 0
  let token1AmountUsd = 0
  let token0Symbol = ''
  let token1Symbol = ''

  const mints = db
    .prepare('SELECT * from mints')
    .all() as MappedClMint[]
  for(const mint of mints) {
    token0Amount += Number(mint.amount0)
    token1Amount += Number(mint.amount1)
  }
  if(mints.length > 0) {
    token0Symbol = mints[0].token0
    token1Symbol = mints[0].token1
  }

  const burns = db
    .prepare('SELECT * from burns')
    .all() as MappedClBurn[]
  for(const burn of burns) {
    token0Amount -= Number(burn.amount0)
    token1Amount -= Number(burn.amount1)
  }

  const token0Coingecko = CoinGeckoTokensMap[token0Symbol]
  const token1Coingecko = CoinGeckoTokensMap[token1Symbol]
  if(token0Coingecko && token1Coingecko) {
    const prices = await getTokensPrice([
      token0Coingecko,
      token1Coingecko
    ])
    token0AmountUsd = prices[token0Coingecko].usd * token0Amount
    token1AmountUsd = prices[token1Coingecko].usd * token1Amount
  }

  console.log(`${
    token0Symbol
  } amount=${
    token0Amount
  } ($${
    token0AmountUsd
  }), ${
    token1Symbol
  } amount=${
    token1Amount
  } ($${
    token1AmountUsd
  })`)
}

main()
