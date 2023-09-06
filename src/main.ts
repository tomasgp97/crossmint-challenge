import axios from 'axios';
import { API_URL, CANDIDATE_ID } from './constants';
import { PolyanetsService } from './polyanet-service';
import { Resource } from './models';
import { GenericService } from './generic-service';
import { ComethService } from './cometh-service';
import { SoloonService } from './soloon-service';
import axiosRetry from 'axios-retry';


async function createResource(service: GenericService<Resource>, differential: string,
   obj: {index: {row: number, column: number}, element: string}) {
    const result = await service.createOne({position: {row: obj.index.row, column: obj.index.column}}, differential);
    return result
   }
    
//not the best way to handle error 429 but i was having trouble with axios interceptors to handle errors and other packages such as pLimit
async function main() {
  axiosRetry(axios, { 
    retries: 10, 
    retryDelay: axiosRetry.exponentialDelay,
  
    retryCondition(error) {
      let status;
      if(error.response) {
        status = error.response.status
      }
      switch (status) {
        case 429:
          return true; 
        default:
          return false; 
      }
    },
  });
  try {
    const goalRequest = await axios.get(`${API_URL}/map/${CANDIDATE_ID}/goal`)
  
    if(goalRequest) {
      const goalMap = goalRequest.data.goal
      const mappedArray = [];
  
  for (let rowIndex = 0; rowIndex < goalMap.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < goalMap[rowIndex].length; columnIndex++) {
      const element = goalMap[rowIndex][columnIndex];
      
      const obj = {index: { row: rowIndex, column: columnIndex }, element};
      
      mappedArray.push(obj);
    }
  }
  
  const filtered = mappedArray.filter(obj => obj.element !== 'SPACE');

  const elementToDataMap: { [key: string]: {resourceType: string, service: GenericService<Resource>, differential: string} } = {
    WHITE_SOLOON: {resourceType: 'Soloon', service: new SoloonService(), differential: 'white'},
    PURPLE_SOLOON: {resourceType: 'Soloon', service: new SoloonService(), differential: 'purple'},
    BLUE_SOLOON: {resourceType: 'Soloon', service: new SoloonService(), differential: 'blue'},
    RED_SOLOON: {resourceType: 'Soloon', service: new SoloonService(), differential: 'red'},
    RIGHT_COMETH: {resourceType: 'Cometh', service: new ComethService(), differential: 'right'},
    LEFT_COMETH: {resourceType: 'Cometh', service: new ComethService(), differential: 'left'},
    UP_COMETH: {resourceType: 'Cometh', service: new ComethService(), differential: 'up'},
    DOWN_COMETH: {resourceType: 'Cometh', service: new ComethService(), differential: 'down'},
    POLYANET: {resourceType: 'Polyanet', service: new PolyanetsService(), differential: ''},
  };


  const functionsToProcess = filtered.map(obj => async () => {
    const serviceInfo = elementToDataMap[obj.element];
    if (serviceInfo) {
      const resource = await createResource(serviceInfo.service, serviceInfo.differential, obj);
      console.log(resource.position);
    } else {
      console.warn('Unknown entity');
    }
  });
  
  while (functionsToProcess.length) {
    const batch = functionsToProcess.splice(0, 3);
    await Promise.all(batch.map(func => func()));
  }
  }

  } catch(e) {
    console.error(e)
  }
 
}



main();