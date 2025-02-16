export interface ICryptoData {
  id: number;
  trackedCryptocurrencyId: number;
  name: string;
  price: number;
  priceChange?: number;
  createDate: string; // Date in ISO format
}