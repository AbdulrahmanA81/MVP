import React from 'react';
import { Redirect } from 'expo-router';

export default function StartPage() {
  // TODO: Implement logic to check authentication status
  // and whether onboarding is complete.
  const isAuthenticated = false; // Placeholder
  const isOnboardingComplete = false; // Placeholder

  if (!isAuthenticated && !isOnboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  // If authenticated or onboarding done, go to library
  return <Redirect href="/(tabs)/library" />;

  // Alternative: Could show a splash screen while checking auth
  // return <SplashScreen />;
} 