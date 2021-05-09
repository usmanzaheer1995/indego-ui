import { IStation } from "./station.interface";

export interface IPostStationResponse {
  message: string;
  data: IStation[];
}