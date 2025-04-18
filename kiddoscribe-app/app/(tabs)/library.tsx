import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';

// Mock story data
interface LibraryStory {
    id: string;
    title: string;
    status: 'Ready' | 'Draft' | 'Downloaded';
    coverImage: string;
}

const mockStories: LibraryStory[] = [
    {
        id: 'story_123',
        title: 'Space Adventure',
        status: 'Ready',
        coverImage: 'https://via.placeholder.com/150x200?text=Cover+1'
    },
    {
        id: 'story_456',
        title: 'Ocean Friends',
        status: 'Draft',
        coverImage: 'https://via.placeholder.com/150x200?text=Cover+2'
    },
     {
        id: 'story_789',
        title: 'Counting Stars',
        status: 'Downloaded',
        coverImage: 'https://via.placeholder.com/150x200?text=Cover+3'
    },
    // Add more mock stories if needed
];

export default function LibraryScreen() {
  const router = useRouter();

  // Placeholder for actual story data fetching
  const stories = mockStories;

  const renderStoryItem = ({ item }: { item: LibraryStory }) => (
     // Only make Ready/Downloaded stories linkable to reader for now
     <Link href={item.status !== 'Draft' ? `/reader/${item.id}` : '#'} disabled={item.status === 'Draft'} style={styles.storyItemLink}>
        <Pressable style={styles.storyItemContainer} /* Pressable still useful for visual feedback if needed */ >
            <View style={styles.storyItemImageContainer}>
                 <Image source={{ uri: item.coverImage }} style={styles.storyItemImage} />
                 {item.status === 'Downloaded' && <Text style={styles.downloadedIcon}>↓</Text>}
            </View>
            <Text style={styles.storyItemTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={[
                styles.storyItemStatus,
                item.status === 'Ready' ? styles.statusReady :
                item.status === 'Draft' ? styles.statusDraft :
                styles.statusDownloaded
            ]}>
                {item.status}
                {item.status === 'Ready' ? ' ✓' : item.status === 'Draft' ? '...' : ''}
             </Text>
        </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
           <Text style={styles.title}>My Library</Text>
           <View style={styles.headerActions}>
                <Link href="/(wizard)/step1" style={styles.addButton}>
                   <Text style={styles.addButtonText}>+</Text>
                </Link>
                <Link href="/(tabs)/settings" style={styles.settingsButton}>
                    <Text style={styles.settingsButtonText}>⚙️</Text>
                </Link>
            </View>
      </View>

      {/* TODO: Implement Filtering controls logic */}
      <Text style={styles.filterPlaceholder}>Filter: ● All ○ Ready ○ Draft ○ Downloaded</Text>

       {stories.length === 0 ? (
            <Text style={styles.emptyMessage}>Your stories will appear here. Tap '+' to create one!</Text>
        ) : (
            <FlatList
                data={stories}
                renderItem={renderStoryItem}
                keyExtractor={(item) => item.id}
                numColumns={2} // Adjust number of columns for grid layout
                contentContainerStyle={styles.gridContainer}
                columnWrapperStyle={styles.gridRow}
            />
       )}
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
  addButton: {
      backgroundColor: '#007bff',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
  },
   addButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 22,
   },
  settingsButton: {
    padding: 10,
    marginLeft: 5,
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
  gridContainer: {
      paddingBottom: 20, // Add padding at the bottom of the grid
  },
  gridRow: {
      justifyContent: 'space-between',
  },
  storyItemLink: { // Style the Link component itself for layout
      width: '48%', // Approximately half width minus spacing
      marginBottom: 15,
  },
  storyItemContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10,
      // Removed width/marginBottom as it's handled by Link
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      alignItems: 'center',
  },
  storyItemImageContainer: {
      width: '100%',
      aspectRatio: 3/4, // Typical book cover aspect ratio
      backgroundColor: '#e9ecef',
      borderRadius: 6,
      marginBottom: 8,
      overflow: 'hidden',
      position: 'relative', // For positioning icons like download status
  },
  storyItemImage: {
      width: '100%',
      height: '100%',
  },
  downloadedIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontSize: 18,
    color: 'rgba(0,0,0,0.6)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  storyItemTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
      color: '#333',
  },
  storyItemStatus: {
      fontSize: 12,
      textAlign: 'center',
      // Base status style (can be empty if all colors are conditional)
  },
  statusReady: {
      color: '#28a745', // Green
  },
  statusDraft: {
       color: '#ffc107', // Yellow
  },
  statusDownloaded: {
      color: '#17a2b8', // Cyan
  },
}); 