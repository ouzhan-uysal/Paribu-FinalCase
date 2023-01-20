import axios, { AxiosResponse } from "axios";
import { IApiRequestType, IApiResponseType } from "types/api.interface";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL || "static input",
  timeout: 15000
});

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody)
};

export const ApiRequests = {
  getOperation: (): Promise<IApiResponseType> => request.get('getUser'),
  postOperation: (payload: IApiRequestType): Promise<IApiResponseType> => request.post('addUser', payload),
  queryOperation: (searchingData: string): Promise<IApiResponseType> => request.get(`all?search=${searchingData}`)
};