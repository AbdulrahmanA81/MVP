import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

export default function CreateStoryTab() {
  // This screen primarily acts as a button to launch the modal wizard
  return (
    <View style={styles.container}>
      <Link href="/story-wizard" asChild>
          <Button title="Start Creating a New Story" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 