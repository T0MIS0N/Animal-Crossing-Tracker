import express from "express"
import cors from "cors"
//This 'tracker' variable imports the route file which holds the API routes.
import tracker from "./api/animal-crossing-tracker.route.js"

//This app variable initalizes the express application (used for creating the server).
const app = express() 

//app.use() defines what the express app is going to be using.
app.use(cors())
app.use(express.json())

//The line below defines the URL for the API. The format is /api/<version-of-api>/<api-name>.
app.use("/api/v1/tracker", tracker)
//If a route is used that's undefined for the server, a 404 error is returned (means not found).
app.use("*", (req,res)=> res.status(404).json({error:"not found"}))

//Exporting our app as a module for use in other files allows us to expand its functionality while being able to organize that code in different files.
export default app