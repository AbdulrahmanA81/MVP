import React from 'react';
import { Tabs } from 'expo-router';
// import FontAwesome from '@expo/vector-icons/FontAwesome'; // Example icon import

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="library"
        options={{
          title: 'My Library',
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Story',
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus-square" color={color} />,
        }}
      />
      {/* Potential future tabs like 'Profile' or 'Settings' could go here */}
    </Tabs>
  );
} 