import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StoryWizardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Story Wizard Screen</Text>
      {/* TODO: Implement multi-step form based on wireframe */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 