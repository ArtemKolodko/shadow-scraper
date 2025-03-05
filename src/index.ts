import {getDepositEvents} from "./api";
import {bootstrapDb} from "./db";
import {ClMint} from "./types";
import {appConfig} from "./config";

const limit = 1000

const main = async () => {
    let skip = 0
    let newDepositEvents: ClMint[] = []
    do {
      try {
        newDepositEvents = await getDepositEvents({
          first: limit,
          skip,
          poolSymbol: appConfig.poolSymbol
        })
        skip += limit

        if(newDepositEvents.length > 0) {
          const first = newDepositEvents[0]
          const last = newDepositEvents[newDepositEvents.length - 1]
          console.log(`[${
            first.transaction.blockNumber
          } - ${
            last.transaction.blockNumber
          }] ${
            +last.transaction.blockNumber - +first.transaction.blockNumber
          } blocks, ${
            newDepositEvents.length
          } events`)
        }
      } catch (e) {
        console.error('Failed to get deposit events:', e)
      }
    } while(newDepositEvents.length > 0)
}

bootstrapDb()
main()
