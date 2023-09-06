// import axios from "axios";
import { GenericService } from "./generic-service";
import { Cometh } from "./models";
import { API_URL, CANDIDATE_ID, requestConfig } from "./constants";
import axios from "axios";

export class ComethService extends GenericService<Cometh> {
    constructor() {
        super();
    }

    async createOne(resource: Cometh, data: string): Promise<Cometh> {
        const result = await axios.post(`${API_URL}/comeths`, {row: resource.position.row, column: resource.position.column,
            direction: data, candidateId: CANDIDATE_ID}, requestConfig);

        return result.data;
    }

}