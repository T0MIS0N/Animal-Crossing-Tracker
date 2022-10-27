import http from "../http-common";

//This class contains all functions that make API calls and returns the data from that call.
class CritterDataService {
    getAllBugs(){
        return http.get(`/GetAllBugs/`);
    }
    getAllFish(){
        return http.get(`/GetAllFish/`)
    }
    getAllSeaCreatures(){
        return http.get(`/GetAllSeaCreatures/`)
    }
}

export default new CritterDataService();