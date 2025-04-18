import { Stack } from 'expo-router';
import React from 'react';

// TODO: Add Redux Provider and other global contexts

export default function RootLayout() {
  return (
    <Stack>
      {/* The main tab navigator */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Onboarding flow */}
      <Stack.Screen name="onboarding" options={{ headerShown: false, presentation: 'modal' }} />
      {/* Story creation wizard */}
      <Stack.Screen name="story-wizard" options={{ title: 'Create a Story', presentation: 'modal' }} />
      {/* Page editor */}
      <Stack.Screen name="editor/[id]" options={{ title: 'Edit Story' }} />
      {/* Settings/Paywall */}
      <Stack.Screen name="settings" options={{ title: 'Settings & Pro', presentation: 'modal' }} />
      {/* Other modals or screens can be added here */}
    </Stack>
  );
} 