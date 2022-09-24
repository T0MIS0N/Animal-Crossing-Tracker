//To access DB data, we of course must import the BugsDAO.
import BugsDAO from "../dao/bugsDAO.js"

export default class BugsController{
    //This API call returns bugs and can take a query to return filtered results.
    static async apiGetBugs(req,res,next){
        //This line checks if a results per page variable is present. If not, it falls back to a default of 80.
        const bugsPerPage = req.query.bugsPerPage ? parseInt(req.query.bugsPerPage, 10):80
        //This line checks if a page number has been given. If not, it defaults to zero.
        const page = req.query.page ? parseInt(req.query.page, 10): 0

        //This initializes an empty filters variable.
        let filters = {}
        //This condition block checks if a filter is present in the query. If so, it sets the filter's query variables to match the supplied filters.
        if (req.query.price){
            filters.price = req.query.price
        }else if (req.query.time){
            filters.time = req.query.time
        }else if (req.query.name){
            filters.name = req.query.name
        }

        //This const returns a bug list and total number of bugs from a query based on the supplied filters.
        const {bugsList, totalNumBugs} = await BugsDAO.getBugs({
            filters,
            page,
            bugsPerPage,
        })

        //This is the API response which is whats returned to the user calling the API.
        //Basically, when the user navigates to the API URL, this data is what they see.
        let response = {
            bugs: bugsList, //This is the bugslist that's returned.
            page: page, //This is the returned page number.
            filters: filters, //These are the filters used.
            entries_per_page: bugsPerPage, //This is the entries wanted per page
            total_results: totalNumBugs, //This is the total amount of bugs
        }
        //This line returns the API response to the user in JSON format.
        res.json(response)
    }

    static async apiGetAllBugs(req,res,next){

        //This const returns a bug list and total number of bugs from a query based on the supplied filters.
        const {bugsList, totalNumBugs} = await BugsDAO.getAllBugs()

        //This is the API response which is whats returned to the user calling the API.
        //Basically, when the user navigates to the API URL, this data is what they see.
        let response = {
            bugs: bugsList, //This is the bugslist that's returned.
            total_results: totalNumBugs, //This is the total amount of bugs
        }
        //This line returns the API response to the user in JSON format.
        res.json(response)
    }
}