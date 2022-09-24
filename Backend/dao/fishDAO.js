//fish variable allows us to store a reference to the DB.
let fish

export default class FishDAO{
    //InjectDB allows the initial connection to the DB. This method is called when the server starts.
    static async injectDB(conn){
        //If the reference is already present, we don't need to set it, so the method returns (exits the method).
        if (fish){
            return
        }
        try{
            //This line tries to connect to the Database.
            fish = await conn.db(process.env.ANIMAL_CROSSING_TRACKER_NS).collection("Fish")
        } catch (e){
            //If unable to connect, we write the error to the console.
            console.error(`Unable to establish a collection handle in fishDAO: ${e}`,)
        }
    }

    //This returns a list of all fish in the DB.
    static async getAllFish(){
        //Define the query variable
        let query

        try{
            //The query is set to all results from the DB query
            query = await fish
                .find()
        } catch (e){
            //If there's an issue retrieving fish, an empty list is returned and the error is logged.
            console.error(`Unable to issue find command, ${e}`)
            return {fishList: [], totalNumFish:0}
        }

        try{
            //Set fish list to an array
            const fishList = await query.toArray()
            //This variable counts the results from the query to find the total number of fish.
            const totalNumFish = await fish.countDocuments()

            //Finally, the list of fish and total number of fish is returned.
            return {fishList, totalNumFish}
        } catch (e){
            //If an error is encountered, the error is logged and an empty list is returned.
            console.error(`Unable to convert query to array or problem counting documents, ${e}`)
            return {fishList: [], totalNumFish: 0}
        }
    }
}