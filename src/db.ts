import Database from 'better-sqlite3'

let db

const createDatabase = () => {
  return new Database('shadow.db', {verbose: console.log})
}

export const bootstrapDb = () => {
  db = createDatabase()
  console.log("Created database:", db.name)
}
