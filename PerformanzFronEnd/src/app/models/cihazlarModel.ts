import { Guid } from "guid-typescript";

export interface Cihaz {

  ekleyenKullaniciFk: string;
  cihazTipFk: number;
  girdilerJson: string;
  cihazKod: string;
  gonderimTarihi: Date;
  paketTarihi: Date;
  id:Guid
  guncellemeTarihi:Date;




}
