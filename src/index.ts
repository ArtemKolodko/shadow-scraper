import {getDepositEvents} from "./api";
import {bootstrapDb, exportDatabase, insertDepositEvents} from "./db";
import {ClMint} from "./types";
import {appConfig} from "./config";

const limit = 1000

const main = async () => {
  let timeStart = Date.now()
  let skip = 0
  let newDepositEvents: ClMint[] = []
  let totalDepositEvents = 0
  do {
    const timeStart = Date.now()
    try {
      newDepositEvents = await getDepositEvents({
        first: limit,
        skip,
        poolSymbol: appConfig.poolSymbol
      })
      skip += limit
      totalDepositEvents += newDepositEvents.length

      if(newDepositEvents.length > 0) {
        insertDepositEvents(newDepositEvents)

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
        } events, ${(Date.now() - timeStart)} ms`)
      }
      break;
    } catch (e) {
      console.error('Failed to get deposit events:', e)
    }
  } while(newDepositEvents.length > 0)

  exportDatabase()
  console.log(`Export completed, path=/export, total mint events=${
    totalDepositEvents
  }, elapsed: ${Math.round((Date.now() - timeStart) / 1000)} seconds`)
  process.exit(1)
}

bootstrapDb()
main()

process.on('exit', (code) => {
  console.log('Process exited with code:', code);
});
