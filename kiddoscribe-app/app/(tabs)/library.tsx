import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function LibraryScreen() {
  const router = useRouter();

  // Placeholder for actual story data
  const stories = [];

  const handleCreateNew = () => {
      // Alternative navigation method using router.push if needed
      // router.push('/(wizard)/step1');
      console.log('Navigate to wizard...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
           <Text style={styles.title}>My Library</Text>
           <View style={styles.headerActions}>
             {/* Use Link without asChild - Link itself is pressable */}
                <Link href="/(wizard)/step1" style={styles.addButton}>
                   {/* Apply text styling directly */}
                   <Text style={styles.addButtonText}>+</Text>
                </Link>
                <Link href="/(tabs)/settings" style={styles.settingsButton}>
                    {/* Apply text styling directly */}
                    <Text style={styles.settingsButtonText}>⚙️</Text>
                </Link>
            </View>
      </View>

      {/* TODO: Implement Filtering controls */}
      <Text style={styles.filterPlaceholder}>Filter: ● All ○ Ready ○ Draft ○ Downloaded</Text>

       {/* TODO: Implement Grid view based on wireframe */}
       {stories.length === 0 ? (
            <Text style={styles.emptyMessage}>Your stories will appear here. Tap '+' to create one!</Text>
        ) : (
            <Text>Story Grid Placeholder</Text> // Replace with actual grid component
       )}

      {/* Removed old example links */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust for status bar
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
      flexDirection: 'row',
      alignItems: 'center', // Align items vertically
  },
  // Style applied directly to Link now
  addButton: {
      backgroundColor: '#007bff',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      // Ensure Link behaves visually like the Pressable did
      display: 'flex',
  },
   addButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 22,
   },
  // Style applied directly to Link now
  settingsButton: {
    padding: 10,
    marginLeft: 5,
     // Ensure Link behaves visually like the Pressable did
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButtonText: {
      fontSize: 24,
  },
  filterPlaceholder: {
      marginBottom: 20,
      color: '#6c757d',
      fontSize: 14,
      textAlign: 'center',
  },
  emptyMessage: {
      flex: 1,
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: '#6c757d',
  },
}); 