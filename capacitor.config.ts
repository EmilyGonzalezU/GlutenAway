import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'GlutenAway',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: [
        'profile',
        'email'
      ],
      serverClientId: '353111503726-i2m909hhm96fggdenpeskvu4illps328.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
