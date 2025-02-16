export * from './cryptoData.service';
import { CryptoDataService } from './cryptoData.service';
export * from './settings.service';
import { SettingsService } from './settings.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [CryptoDataService, SettingsService, WeatherForecastService];
