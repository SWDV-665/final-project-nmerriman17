import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.traveltracker.app',
  appName: 'app-travel-tracker',
  webDir: '/Users/nicolemerriman/app-travel-tracker/dist',
  plugins: {
    Toast: {
      web: [
        {
          show: true
        }
      ]
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
