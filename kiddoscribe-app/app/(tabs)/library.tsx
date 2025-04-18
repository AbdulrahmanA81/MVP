import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My KiddoScribe Library</Text>
      {/* TODO: Implement Grid view based on wireframe */}
      {/* TODO: Implement Filtering */}
      <Text>Your stories will appear here.</Text>

      {/* Example links to other screens */}
      <Link href="/editor/123" asChild>
        <Button title="Go to Example Editor (ID: 123)" />
      </Link>
      <Link href="/settings" asChild>
        <Button title="Go to Settings/Pro" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 