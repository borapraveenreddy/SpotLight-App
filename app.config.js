import 'dotenv/config';

export default {
  expo: {
    name: "MyApp",
    slug: "MyApp",
    version: "1.0.0",
    extra: {
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
    },
    android: {
      package: "com.yourcompany.myapp"
    },
    ios: {
      bundleIdentifier: "com.yourcompany.myapp"
    }
  }
};