import axios from "axios";
import  { API_URL, CANDIDATE_ID, requestConfig } from "./constants";
import { GenericService } from "./generic-service";
import { Polyanet, Position } from "./models";


export class PolyanetsService extends GenericService<Polyanet> {

    constructor(){
        super();
    }

    async createOne(resource: Polyanet, data: string): Promise<Polyanet> {
        let result = await axios.post(`${API_URL}/polyanets`, {row: resource.position.row, column: resource.position.column, 
            candidateId: CANDIDATE_ID}, requestConfig)
        
        return result.data;
      
    }
   
}
