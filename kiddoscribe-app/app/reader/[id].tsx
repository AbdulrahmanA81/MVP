import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
  Animated,
  PanResponder,
  StatusBar,
  useColorScheme,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock story data structure
interface StoryPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
}

interface Story {
  id: string;
  title: string;
  pages: StoryPage[];
}

export default function ReaderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const systemColorScheme = useColorScheme();

  // State for reader settings
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [darkMode, setDarkMode] = useState(systemColorScheme === 'dark');
  const [fontSize, setFontSize] = useState(16);
  const [isLoading, setIsLoading] = useState(true);

  // Animation for page turning
  const position = useRef(new Animated.Value(0)).current;

  // Mock story data (in a real app, fetch from API or local storage)
  const [story, setStory] = useState<Story | null>(null);

  // Mock fetching story data
  useEffect(() => {
    setIsLoading(true);
    console.log(`Fetching story for reader, ID: ${id}`);
    // Simulate API call / local fetch
    const timer = setTimeout(() => {
      setStory({
        id: String(id),
        title: `Space Adventure ${id?.substring(0, 5)}`,
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
          },
          {
            pageNumber: 4,
            text: 'When Alex was done counting, the rings began to dance and swirl around the planet. It was the most beautiful sight Alex had ever seen.',
            imageUrl: 'https://via.placeholder.com/400x300?text=Dancing+Rings+4',
          },
          {
            pageNumber: 5,
            text: 'Alex took photos to share with friends back home. Everyone would love seeing the colorful counting rings of this special little planet.',
            imageUrl: 'https://via.placeholder.com/400x300?text=Final+Scene+5',
          }
        ]
      });
      setIsLoading(false);
    }, 500); // Simulate network delay

    return () => clearTimeout(timer);
  }, [id]);


  // Pan responder for swipe navigation
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isLoading, // Only respond if not loading
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gestureState) => {
        // Move the page with the gesture
        position.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!story) return;

        if (gestureState.dx < -50 && currentPageIndex < story.pages.length - 1) {
          // Swipe left, go to next page
          Animated.timing(position, {
            toValue: -width,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setCurrentPageIndex(currentPageIndex + 1);
            position.setValue(0);
          });
        } else if (gestureState.dx > 50 && currentPageIndex > 0) {
          // Swipe right, go to previous page
          Animated.timing(position, {
            toValue: width,
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setCurrentPageIndex(currentPageIndex - 1);
            position.setValue(0);
          });
        } else {
          // Reset position if swipe wasn't enough
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading || !story) {
    return (
      <View style={[styles.container, darkMode && styles.darkContainer, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={darkMode ? '#fff' : '#007bff'} />
        <Text style={[styles.loadingText, darkMode && styles.darkText]}>Loading Story...</Text>
      </View>
    );
  }

  const currentPage = story.pages[currentPageIndex];

  return (
    <View style={[
      styles.container,
      darkMode && styles.darkContainer
    ]}>
      <StatusBar hidden={!showControls} barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {/* Reader Controls (hidden by default) */}
      {showControls && (
        <View style={styles.controlsOverlay}>
          <View style={styles.controlsHeader}>
             {/* Removed asChild from Link */}
            <Link href="/(tabs)/library" style={styles.controlButton}>
              <Text style={styles.controlButtonText}>← Exit</Text>
            </Link>
            <Text style={styles.pageIndicator}>
              Page {currentPageIndex + 1} of {story.pages.length}
            </Text>
            <Pressable style={styles.controlButton} onPress={toggleDarkMode}>
              <Text style={styles.controlButtonText}>
                {darkMode ? '☀️' : '🌙'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.fontControls}>
            <Pressable style={styles.fontButton} onPress={decreaseFontSize}>
              <Text style={styles.fontButtonText}>A-</Text>
            </Pressable>
            <Pressable style={styles.fontButton} onPress={increaseFontSize}>
              <Text style={styles.fontButtonText}>A+</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Swipeable Page Content */}
      <Animated.View
        style={[
          styles.pageContainer,
          { transform: [{ translateX: position }] }
        ]}
        {...panResponder.panHandlers}
      >
        <Pressable style={styles.touchTarget} onPress={toggleControls}>
          <ScrollView contentContainerStyle={styles.pageContent}>
            <View style={styles.pageImageContainer}>
              <Image
                source={{ uri: currentPage.imageUrl }}
                style={styles.pageImage}
                resizeMode="cover"
              />
            </View>

            <Text style={[
              styles.pageText,
              { fontSize },
              darkMode && styles.darkText
            ]}>
              {currentPage.text}
            </Text>
          </ScrollView>
        </Pressable>

        {/* Swipe Indicators (only shown at first to guide users) */}
        {currentPageIndex === 0 && (
          <Animated.View style={[styles.swipeIndicator, { opacity: position.interpolate({ inputRange: [-50, 0, 50], outputRange: [0, 1, 0], extrapolate: 'clamp' }) }]}>
            <Text style={styles.swipeText}>Swipe to turn pages</Text>
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#6c757d',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 50, // Adjust for status bar
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  controlsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  controlButton: {
    padding: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pageIndicator: {
    color: '#fff',
    fontSize: 14,
  },
  fontControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fontButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
    borderRadius: 20,
  },
  fontButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageContainer: {
    flex: 1,
  },
  touchTarget: {
    flex: 1,
  },
  pageContent: {
    padding: 20,
    paddingTop: 30, // Less padding top as controls are separate
    paddingBottom: 60, // More padding at bottom
  },
  pageImageContainer: {
    width: '100%',
    aspectRatio: 4/3,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#f8f9fa',
  },
  pageImage: {
    width: '100%',
    height: '100%',
  },
  pageText: {
    lineHeight: 28,
    color: '#333',
    // Removed marginBottom: 40 to rely on container padding
  },
  darkText: {
    color: '#f8f9fa',
  },
  swipeIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none', // Prevent indicator from blocking touches
  },
  swipeText: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
  },
}); 