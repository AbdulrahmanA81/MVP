import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';

// Mock story data structure
interface Page {
  pageNumber: number;
  text: string;
  imageUrl: string;
}

interface Story {
  id: string;
  title: string;
  pages: Page[];
  remainingImages: number;
}

export default function EditorScreen() {
  const router = useRouter();
  // Explicitly type the search params
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState('');

  // Provide a default empty story structure
  const [story, setStory] = useState<Story>(() => ({
    id: String(id ?? `temp_${Date.now()}`), // Use id or generate temporary one
    title: 'Loading Story...', // Initial loading title
    remainingImages: 0,
    pages: []
  }));

  // Mock fetching story data - replace with actual API call
  useEffect(() => {
    console.log(`Fetching story with ID: ${id}`);
    // Simulate API call
    const timer = setTimeout(() => {
        setStory({
            id: String(id),
            title: `Space Adventure ${id?.substring(0, 5)}`, // Example dynamic title
            remainingImages: 4,
            pages: [
              {
                pageNumber: 1,
                text: 'Once upon a time, in a galaxy far away, there lived a little astronaut named Alex. Alex loved counting stars and planets as they traveled through space.',
                imageUrl: 'https://via.placeholder.com/400x300?text=Space+Scene+1',
              },
              {
                pageNumber: 2,
                text: 'One day, Alex discovered a tiny planet with rings of colorful space dust. "I\'ll count all the colors!" said Alex excitedly.',
                imageUrl: 'https://via.placeholder.com/400x300?text=Planet+Scene+2',
              },
              {
                pageNumber: 3,
                text: 'Alex counted red rings, blue rings, and yellow rings. Each ring sparkled like a rainbow in space.',
                imageUrl: 'https://via.placeholder.com/400x300?text=Colorful+Rings+3',
              }
            ]
        });
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [id]); // Re-fetch if id changes

  // Initialize editable text when page or story changes
  useEffect(() => {
    if (story.pages && story.pages[currentPageIndex]) {
      setEditableText(story.pages[currentPageIndex].text);
    }
  }, [currentPageIndex, story.pages]);

  // Ensure currentPage is defined even if story is loading
  const currentPage = story.pages?.[currentPageIndex] || { pageNumber: 0, text: '', imageUrl: 'https://via.placeholder.com/400x300?text=Loading...' };
  const totalPages = story.pages?.length ?? 0;

  const handleSave = () => {
    if (!story.pages) return; // Don't save if pages aren't loaded

    // Update the current page's text
    const updatedPages = [...story.pages];
    updatedPages[currentPageIndex] = {
      ...updatedPages[currentPageIndex],
      text: editableText,
    };

    setStory({
      ...story,
      pages: updatedPages,
    });

    setIsEditing(false);

    // In a real app, you would save to backend here
    console.log('Saving page data for story:', story.id, 'Page:', currentPageIndex + 1);
    Alert.alert('Success', 'Page saved successfully!');
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
      setIsEditing(false);
    }
  };

  const handleNextPage = () => {
    if (story.pages && currentPageIndex < story.pages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
      setIsEditing(false);
    }
  };

  const handleRegenerateImage = () => {
    if (story.remainingImages <= 0) {
      Alert.alert('Image Quota Exhausted', 'Upgrade to Pro for unlimited images.');
      return;
    }

    // In a real app, you would call the API to regenerate the image
    console.log('Regenerating image for story:', story.id, 'Page:', currentPageIndex + 1);
    Alert.alert('Regenerating Image', 'Your new image will appear shortly. (Mock)');

    // Mock updating the remaining images count and image URL
    const updatedPages = [...story.pages];
    updatedPages[currentPageIndex] = {
        ...updatedPages[currentPageIndex],
        imageUrl: `https://via.placeholder.com/400x300?text=New+Image+${Date.now()}`
    };

    setStory({
      ...story,
      pages: updatedPages,
      remainingImages: story.remainingImages - 1,
    });
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        {/* Removed asChild from Link */}
        <Link href="/(tabs)/library" style={styles.headerButton}>
          <Text style={styles.headerLinkText}>← Back</Text>
        </Link>
        <Text style={styles.headerTitle} numberOfLines={1}>{story.title}</Text>
        <Pressable style={styles.headerButton} onPress={isEditing ? handleSave : () => setIsEditing(true)}>
          <Text style={styles.headerLinkText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentPage.imageUrl }}
            style={styles.storyImage}
            resizeMode="cover"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          {isEditing ? (
            <TextInput
              value={editableText}
              onChangeText={setEditableText}
              multiline
              style={styles.textInput}
              placeholder="Enter your story text here..."
              autoFocus
            />
          ) : (
            <Text style={styles.storyText}>{currentPage.text}</Text>
          )}
        </View>

        {/* Navigation and Actions */}
        <View style={styles.actionsContainer}>
          <Pressable
            style={[styles.navButton, currentPageIndex === 0 && styles.disabledButton]}
            onPress={handlePrevPage}
            disabled={currentPageIndex === 0}
          >
            <Text style={styles.navButtonText}>Previous Page</Text>
          </Pressable>

          <Pressable
            style={styles.regenerateButton}
            onPress={handleRegenerateImage}
          >
            <Text style={styles.regenerateButtonText}>Regenerate ({story.remainingImages} left)</Text>
          </Pressable>

          <Pressable
            style={[styles.navButton, totalPages > 0 && currentPageIndex === totalPages - 1 && styles.disabledButton]}
            onPress={handleNextPage}
            disabled={totalPages === 0 || currentPageIndex === totalPages - 1}
          >
            <Text style={styles.navButtonText}>Next Page</Text>
          </Pressable>
        </View>

        {/* Export button */}
        <Pressable
          style={[styles.exportButton, totalPages === 0 && styles.disabledButton]} // Disable if no pages
          onPress={() => router.push(`/export/${id}`)}
          disabled={totalPages === 0}
        >
          <Text style={styles.exportButtonText}>Export Story</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50, // Adjust for status bar
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  headerButton: { // Style for the Pressable/Link area
    padding: 10,
    minWidth: 60, // Ensure enough tap area
    alignItems: 'center',
  },
  headerLinkText: { // Style for the text inside buttons
    fontSize: 16,
    color: '#007bff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 5, // Add space between buttons and title
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40, // Ensure space below export button
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4/3,
    backgroundColor: '#e9ecef', // Placeholder background
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    minHeight: 150,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items vertically
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    flexShrink: 1, // Allow button to shrink if needed
  },
  navButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#ced4da', // More distinct disabled color
    opacity: 0.7,
  },
  regenerateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 10, // Add horizontal margin
    flexShrink: 1,
  },
  regenerateButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exportButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 