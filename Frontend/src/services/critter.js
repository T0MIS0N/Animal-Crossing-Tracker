import http from "../http-common";

//This class contains all functions that make API calls and returns the data from that call.
class CritterDataService {
    getAll(){
        return http.get(`/GetAllBugs/`);
    }

}

export default new CritterDataService();