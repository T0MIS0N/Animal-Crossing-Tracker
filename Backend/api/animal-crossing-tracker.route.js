import express from "express"
//BugsCtrl variable refers to the bugs controller which lets the route access bug data from the DB.
import BugsCtrl from "./bugs.controller.js"
import FishCtrl from "./fish.controller.js"
import SeaCreaturesCtrl from "./sea-creatures.controller.js"

//This router variable gives us access to the express router.
const router = express.Router()

//This line defines the default route of the api (It currently returns json data for the bugs).
router.route("/GetAllBugs/").get(BugsCtrl.apiGetAllBugs)
router.route("/GetAllFish/").get(FishCtrl.apiGetAllFish)
router.route("/GetAllSeaCreatures/").get(SeaCreaturesCtrl.apiGetAllSeaCreatures)

//The router is exported so it can be used elsewhere.
export default router