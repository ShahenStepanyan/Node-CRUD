// const express = require("express")
// const {connectToDb, getDb} = require('./db')
// const PORT = 3001;

// const app = express()
// app.use(express.json())
// let db;
// connectToDb((err) => {
//   if(!err) {
//     app.listen(PORT, (error) => {
//       error ? console.log(error) : console.log(`Listening port ${PORT}`)
//     });
//     db = getDb()
//   }else {
//     console.log("DB connection Error:" + err)
//   }
// })

// app.get("/login", (req,res) => {
//   const users = []
//   db
//   .collection("users")
//   .find()
//   .forEach((user) => users.push(user) )
//   .then(() => {
//     res
//     .status(200)
//     .json(users[0])
//   })
// }) 

