import { Stack } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Placeholder slice
const placeholderSlice = createSlice({
  name: "placeholder",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Redux store with at least one reducer
const store = configureStore({
  reducer: {
    placeholder: placeholderSlice.reducer, // Add placeholder reducer
    // Add your actual reducers here later
    // user: userReducer,
    // stories: storiesReducer,
  },
  // Add middleware or devTools configuration if needed
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}> {/* Default hide header */}
        {/* Main tab navigator */}
        <Stack.Screen name="(tabs)" />

        {/* Onboarding flow */}
        <Stack.Screen name="onboarding" options={{ presentation: 'modal' }} />

        {/* Wizard flow - uses its own layout */}
        <Stack.Screen name="(wizard)" />

        {/* Story creation and viewing flow */}
        <Stack.Screen name="progress" options={{ gestureEnabled: false }} />
        <Stack.Screen name="editor/[id]" />
        <Stack.Screen name="export/[id]" />
        <Stack.Screen name="reader/[id]" options={{ animation: 'fade' }} />

        {/* Separate Settings Screen (will be handled by tabs layout if inside (tabs)) */}
        {/* If settings is intended to be a top-level modal or separate screen: */}
        {/* <Stack.Screen name="settings" options={{ presentation: 'modal' }} /> */}
        {/* Note: Currently settings is defined within (tabs)/settings.tsx */}
        {/* If you have app/settings.tsx and want it top-level, uncomment above */}
        {/* and ensure it's not defined within (tabs) layout */}
      </Stack>
    </Provider>
  );
} 