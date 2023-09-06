import axios, { AxiosRequestConfig } from 'axios'
import * as dotenv from 'dotenv'

dotenv.config({path:"../.env"})

export const API_URL = process.env.API_URL || "https://challenge.crossmint.io/api"
export const CANDIDATE_ID = process.env.CANDIDATE_ID || "56dba23a-03ec-4ccf-b86b-669c16205715"

export const requestConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type":"application/json"
    }
}





  