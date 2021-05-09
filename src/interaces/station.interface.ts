import { IBike } from './bike.interface';

export interface IStation {
  _id: string;
  name: string;
  totalDocks: number;
  docksAvailable: number;
  bikesAvailable: number;
  classicBikesAvailable: number;
  smartBikesAvailable: number;
  electricBikesAvailable: number;
  rewardBikesAvailable: number;
  rewardDocksAvailable: number;
  kioskStatus: string;
  kioskPublicStatus: string;
  kioskConnectionStatus: string;
  kioskType: number;
  kioskId: number;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  closeTime?: string;
  eventEnd?: string;
  eventStart?: string;
  isEventBased: boolean;
  isVirtual: boolean;
  notes?: string;
  openTime?: string;
  publicText: string;
  timeZone?: string;
  trikesAvailable: number;
  latitude: string;
  longitude: string;
  bikes: IBike[];
  createdAt: Date;
}
