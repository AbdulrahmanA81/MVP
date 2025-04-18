import { Stack } from 'expo-router';

export default function WizardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" />
      {/* Add other wizard steps here if needed */}
    </Stack>
  );
} 