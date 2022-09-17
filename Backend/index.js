//The app variable is our express app import from server.js
import app from "./server.js"
import mongodb, { MongoClient } from "mongodb"
//This dotenv variable is the import that holds database connection information
import dotenv from "dotenv"
//BugsDAO imports our class that lets us query the DB and filter the results
import BugsDAO from "./dao/bugsDAO.js"

//The line below loads our environment variables into this file
dotenv.config()
//This line gives us access to our mongoDB client
const mongoClient = mongodb.MongoClient
//This variable defines the port. It uses the port defined in dotenv, but can default to 8000 if our dotenv variable is unusable for any reason.
const port = process.env.PORT || 8000

//This chunk of code below connects to the MongoDB client
mongoClient.connect(
    //The line below processes our connection to the DB with our connection variable from dotenv.
    process.env.ANIMAL_CROSSING_TRACKER_DB_URI,
    {
        maxPoolSize:50,//This limits connections to the DB to 50 people at a time.
        wtimeoutMS:2500,//After 2500ms requests to the DB will timeout.
        useNewUrlParser:true} //This allows use of the new mongoDB parser.
).catch(err => {
    //If there's a problem connecting to the DB, the error is logged and the process is ended.
    console.error(err.stack)
    process.exit(1)
}).then(async client =>{
    //If connection is successful, we listen on our port and give confirmation in the log that the app is listening.
    await BugsDAO.injectDB(client) //On connection we also inject the bugsDAO
    app.listen(port,()=>{
        console.log(`listening on port ${port}`)
    })
})