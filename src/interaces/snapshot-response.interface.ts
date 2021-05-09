import { IStation } from "./station.interface";
import { IWeather } from "./weather.interface";

export interface ISnapshotResponse {
  message: string;
  at: Date;
  station: IStation;
  weather: IWeather;
}

export interface ISnapshotsResponse {
  message: string;
  at: Date;
  stations: IStation[];
  weather: IWeather;
}
