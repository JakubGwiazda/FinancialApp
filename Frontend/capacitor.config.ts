import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourapp.mobile',
  appName: 'YourApp',
  webDir: 'dist/cryptoinfo/browser',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['https://192.168.0.13:7054']
  }
};

export default config;