// import axios from "axios";
import { GenericService } from "./generic-service";
import { Position, Soloon } from "./models";
import { API_URL, CANDIDATE_ID, requestConfig } from "./constants";
import axios from "axios";

export class SoloonService extends GenericService<Soloon> {
    
    constructor(){
        super();
    }

    async createOne(resource: Soloon, data: string): Promise<Soloon> {
        const result = await axios.post(`${API_URL}/soloons`, {row: resource.position.row, 
            column: resource.position.column, color: data, candidateId: CANDIDATE_ID}, requestConfig);
        return result.data;
    }

}