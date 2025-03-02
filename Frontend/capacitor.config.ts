import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourapp.mobile',
  appName: 'YourApp',
  webDir: 'dist/cryptoinfo/browser',
  android:{
  zoomEnabled: false,
  },
  plugins: {
    FirebaseMessaging: {
      presentationOptions: ["alert", "badge", "sound"],
    },
  },
  server: {
    url:'http://192.168.0.13:4200/dashboard'
    cleartext: true,
    allowNavigation: ['https://192.168.0.13:7054']
  }
};

export default config;