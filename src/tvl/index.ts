import {bootstrapDb} from "../db";
import {MappedClBurn, MappedClMint} from "../types";

const main = async () => {
  const db = bootstrapDb()

  let token0Amount = 0
  let token1Amount = 0
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

  console.log(`${token0Symbol} amount=${token0Amount}, ${token1Symbol} amount=${token1Amount}`)
}

main()
