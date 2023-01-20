export interface IApiResponseType {
  data: any;
  message: string;
  status: boolean;
};

export interface IApiRequestType {
  username: string;
  password: string;
};