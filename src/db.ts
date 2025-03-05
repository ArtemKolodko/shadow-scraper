import SqLiteDatabase, { Database } from 'better-sqlite3'
import {ClMint} from "./types";
import {mapClMint} from "./mappers";

let db: Database

export const bootstrapDb = () => {
  db = new SqLiteDatabase('sqlite/shadow.db', {verbose: console.log})

  db.prepare(`DROP TABLE IF EXISTS mints`).run()
  db.prepare(`
    CREATE TABLE mints (
      id TEXT PRIMARY KEY NOT NULL,
      txHash TEXT NOT NULL,
      blockNumber TEXT NOT NULL,
      pool TEXT NOT NULL,
      userAddress TEXT NOT NULL,
      token0 TEXT NOT NULL,
      token1 TEXT NOT NULL,
      amount0 TEXT NOT NULL,
      amount1 TEXT NOT NULL
    )
  `).run()

  console.log("Created database:", db.name)
}

export const insertDepositEvents = (
  events: ClMint[]
) => {
  const insert = db.prepare(`
    INSERT INTO mints (id, txHash, blockNumber, pool, userAddress, token0, token1, amount0, amount1)
    VALUES (@id, @txHash, @blockNumber, @pool, @userAddress, @token0, @token1, @amount0, @amount1)
  `);

  const insertMany = db.transaction((items) => {
    for (const item of items) insert.run(item);
  });

  insertMany(events.map(mapClMint));
}

export const exportDatabase = async () => {
  return db.backup(`export/shadow_export_${Date.now()}.db`)
    .then((data) => {
      console.log('Backup completed successfully', data.totalPages);
    })
    .catch((err) => {
      console.error('Backup failed:', err);
    });
}

process.on('exit', () => db.close());
