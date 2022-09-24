//To access DB data, we of course must import the FishDAO.
import FishDAO from "../dao/fishDAO.js"

export default class FishController{
    static async apiGetAllFish(req,res,next){

        //This const returns a fish list and total number of fish from a query based on the supplied filters.
        const {fishList, totalNumFish} = await FishDAO.getAllFish()

        //This is the API response which is whats returned to the user calling the API.
        //Basically, when the user navigates to the API URL, this data is what they see.
        let response = {
            fish: fishList, //This is the fishList that's returned.
            total_results: totalNumFish, //This is the total amount of fish
        }
        //This line returns the API response to the user in JSON format.
        res.json(response)
    }
}