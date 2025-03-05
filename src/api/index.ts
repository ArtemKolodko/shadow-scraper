import axios from "axios";
import {getDepositsQuery} from "./query";
import {ClMint} from "../types";
import {appConfig} from "../config";

const client = axios.create({
  baseURL: appConfig.shadowSubgraphUrl
})

export interface GetEventsParams {
  skip: number
  first: number
  poolSymbol: string
}

export const getDepositEvents = async (params: GetEventsParams) => {
  const { data } = await client.post<{
    data: {
      clMints: ClMint[]
    }
  }>('/', {
    query: getDepositsQuery(params)
  })
  return data.data.clMints
}
