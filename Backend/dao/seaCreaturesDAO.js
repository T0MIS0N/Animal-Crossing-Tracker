//seaCreatures variable allows us to store a reference to the DB.
let seaCreatures

export default class SeaCreaturesDAO{
    //InjectDB allows the initial connection to the DB. This method is called when the server starts.
    static async injectDB(conn){
        //If the reference is already present, we don't need to set it, so the method returns (exits the method).
        if (seaCreatures){
            return
        }
        try{
            //This line tries to connect to the Database.
            seaCreatures = await conn.db(process.env.ANIMAL_CROSSING_TRACKER_NS).collection("Sea_Creatures")
        } catch (e){
            //If unable to connect, we write the error to the console.
            console.error(`Unable to establish a collection handle in seaCreaturesDAO: ${e}`,)
        }
    }

    //This returns a list of all sea creatures in the DB.
    static async getAllSeaCreatures(){
        //Define the query variable
        let query

        try{
            //The query is set to all results from the DB query
            query = await seaCreatures
                .find()
        } catch (e){
            //If there's an issue retrieving sea creatures, an empty list is returned and the error is logged.
            console.error(`Unable to issue find command, ${e}`)
            return {seaCreaturesList: [], totalNumSeaCreatures:0}
        }

        try{
            //Set sea creatures list to an array
            const seaCreaturesList = await query.toArray()
            //This variable counts the results from the query to find the total number of sea creatures.
            const totalNumSeaCreatures = await seaCreatures.countDocuments()

            //Finally, the list of sea creatures and total number of sea creatures is returned.
            return {seaCreaturesList, totalNumSeaCreatures}
        } catch (e){
            //If an error is encountered, the error is logged and an empty list is returned.
            console.error(`Unable to convert query to array or problem counting documents, ${e}`)
            return {seaCreaturesList: [], totalNumSeaCreatures: 0}
        }
    }
}