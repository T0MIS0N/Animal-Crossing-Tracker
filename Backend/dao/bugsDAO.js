//bugs variable allows us to store a reference to the DB.
let bugs

export default class BugsDao{
    //InjectDB allows the initial connection to the DB. This method is called when the server starts.
    static async injectDB(conn){
        //If the reference is already present, we don't need to set it, so the method returns (exits the method).
        if (bugs){
            return
        }
        try{
            //This line tries to connect to the Database.
            bugs = await conn.db(process.env.ANIMAL_CROSSING_TRACKER_NS).collection("Bugs")
        } catch (e){
            //If unable to connect, we write the error to the console.
            console.error(`Unable to establish a collection handle in bugsDAO: ${e}`,)
        }
    }

    //This returns a list of bugs in the DB based on filters.
    static async getBugs({
        //These 3 options are made-up atm.
        filters = null, //This holds the filters used to sort results.
        page = 0, //This is the page number the user wants; as this app has limited critters, this line and the one below will probably be discarded.
        bugsPerPage = 80, //This line defines how many bugs will be listed on a page.
    }={}){
        let query
        //If the user has supplied filters, the results are sorted based on those filters.
        if (filters){ //TODO: Look into mongoDB queries to allow for complex filtering.
            //This condition sorts based on names; This query needs configuration in mongoDB.
            if ("name" in filters){
                query = {$text:{$search: filters["name"]}}
                //The condition below checks price
            } else if ("price" == filters){
                query = {"price":{$eq: filters["price"]}}//If the bug's price is equal to our filter, we return it
                //The condition below checks time
            } else if ("time" in filters){
                query = {"time":{$eq: filters["time"]}}
            }
        }

        //Define the cursor variable
        let cursor

        try{
            //The cursor is set to all results from the DB query
            cursor = await bugs
                .find(query)
        } catch (e){
            //If there's an issue retrieving bugs, an empty list is returned and the error is logged.
            console.error(`Unable to issue find command, ${e}`)
            return {bugsList: [], totalNumBugs:0}
        }

        //This line limits results based on page number and bugs allowed per page. (This might be removed later as it doesn't quite fit with this part of the app).
        const displayCursor = cursor.limit(bugsPerPage).skip(bugsPerPage * page)

        try{
            //Set bug list to an array
            const bugsList = await displayCursor.toArray()
            //This variable counts the results from the query to find the total number of bugs.
            const totalNumBugs = await bugs.countDocuments(query)

            //Finally, the list of bugs and total number of bugs is returned.
            return {bugsList, totalNumBugs}
        } catch (e){
            //If an error is encountered, the error is logged and an empty list is returned.
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {bugsList: [], totalNumBugs: 0}
        }
    }

    //This returns a list of all bugs in the DB.
    static async getAllBugs(){
        //Define the query variable
        let query

        try{
            //The query is set to all results from the DB query
            query = await bugs
                .find()
        } catch (e){
            //If there's an issue retrieving bugs, an empty list is returned and the error is logged.
            console.error(`Unable to issue find command, ${e}`)
            return {bugsList: [], totalNumBugs:0}
        }

        try{
            //Set bug list to an array
            const bugsList = await query.toArray()
            //This variable counts the results from the query to find the total number of bugs.
            const totalNumBugs = await bugs.countDocuments()

            //Finally, the list of bugs and total number of bugs is returned.
            return {bugsList, totalNumBugs}
        } catch (e){
            //If an error is encountered, the error is logged and an empty list is returned.
            console.error(`Unable to convert query to array or problem counting documents, ${e}`)
            return {bugsList: [], totalNumBugs: 0}
        }
    }
}