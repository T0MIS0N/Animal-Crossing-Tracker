//To access DB data, we of course must import the SeaCreaturesDAO.
import SeaCreaturesDAO from "../dao/seaCreaturesDAO.js"

export default class SeaCreaturesController{
    static async apiGetAllSeaCreatures(req,res,next){

        //This const returns a sea creatures list and total number of sea creatures from a query based on the supplied filters.
        const {seaCreaturesList, totalNumSeaCreatures} = await SeaCreaturesDAO.getAllSeaCreatures()

        //This is the API response which is whats returned to the user calling the API.
        //Basically, when the user navigates to the API URL, this data is what they see.
        let response = {
            seaCreatures: seaCreaturesList, //This is the sea creatures List that's returned.
            total_results: totalNumSeaCreatures, //This is the total amount of sea creatures
        }
        //This line returns the API response to the user in JSON format.
        res.json(response)
    }
}