
export interface ICryptoInfoData{
    price: number,
    cryptoName: string,
    interval: number,
    data: Array<ICandleData>
}

export interface ICandleData{
   openTime: number,
   openPrice: number,
   highPrice: number,
   lowPrice: number,
   closePrice: number,
}