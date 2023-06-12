const {MongoClient} = require("mongodb")

const URL = "mongodb+srv://shahenstepanyan2018:shag.2005.@basa.qwhxadb.mongodb.net/blog?retryWrites=true&w=majority"

let dbConnection
module.exports = {
  connectToDb: (cb) => {
    MongoClient
      .connect(URL)
      .then((client) => {
        console.log("Connectid to Mongodb")
        dbConnection = client.db()
        return cb() 
      })
      .catch((error) => {
        return cb(error)
      })
  },
  getDb: () => dbConnection
}