export interface Dosya {
  dosyaTipFk: number;
  ekleyenKullaniciFk: string;
  icerik: Blob; //Bytte[]
  icerikTip: string;
  etag: string;
  dosyaIsmi: string;
  id: number;
  guncellemeTarihi: Date;
}
