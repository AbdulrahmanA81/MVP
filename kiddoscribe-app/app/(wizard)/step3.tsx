import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function WizardStep3() {
  const router = useRouter();
  // Mock data - in real app, this would come from previous steps
  const [storyParams] = useState({
      title: 'My Space Adventure',
      ageRange: '4-6',
      theme: 'Space',
      vocab: 'Beginner',
      lessons: ['Counting'],
      template: 'Adventure',
      // Assume free tier for now
      remainingImages: 5
  });

  const handleGenerateStory = () => {
    console.log("Generate Story pressed, navigating to progress...");
    // Navigate to Progress Screen, passing title
    router.push({
        pathname: '/progress',
        params: { title: storyParams.title }
    });
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
         <Link href="/(wizard)/step2" style={styles.headerButton}>
            <Text style={styles.headerLinkText}>← Back</Text>
        </Link>
        <Text style={styles.headerTitle}>Story Wizard 3/3</Text>
        {/* No next arrow here */}
        <View style={styles.headerButton} />
      </View>

      <Text style={styles.title}>Story Summary</Text>

       {/* Display summary data from state */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryItem}>Title: {storyParams.title}</Text>
        <Text style={styles.summaryItem}>Age Range: {storyParams.ageRange} years</Text>
        <Text style={styles.summaryItem}>Theme: {storyParams.theme}</Text>
        <Text style={styles.summaryItem}>Vocabulary: {storyParams.vocab}</Text>
        <Text style={styles.summaryItem}>Lessons: {storyParams.lessons.join(', ') || 'None'}</Text>
        <Text style={styles.summaryItem}>Template: {storyParams.template}</Text>
      </View>

      <Text style={styles.tierInfo}>Free Tier: {storyParams.remainingImages} images remaining</Text>
      {/* TODO: Add Upgrade to Pro link/button */}
       <Link href="/(tabs)/settings" style={styles.upgradeLinkContainer}>
            <Text style={styles.upgradeLinkText}>Upgrade to Pro</Text>
       </Link>

      <View style={styles.buttonContainer}>
        <Link href="/(wizard)/step2" style={[styles.button, styles.backButton]}>
            <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
        </Link>
        <Pressable style={[styles.button, styles.generateButton]} onPress={handleGenerateStory}>
          <Text style={styles.buttonText}>Generate Story</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerButton: {
    padding: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  headerLinkText: {
    fontSize: 16,
    color: '#007bff',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
  },
  summaryBox: {
      backgroundColor: '#f8f9fa',
      padding: 15,
      borderRadius: 8,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#eee',
  },
  summaryItem: {
      fontSize: 16,
      marginBottom: 8,
      color: '#333',
  },
  tierInfo: {
      fontSize: 14,
      color: '#6c757d',
      textAlign: 'center',
      marginBottom: 10,
  },
  upgradeLinkContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  upgradeLinkText: {
      fontSize: 14,
      color: '#007bff',
      textAlign: 'center',
      textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  backButton: {
      backgroundColor: '#6c757d',
  },
  generateButton: {
      backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
   backButtonText: {
      // Potentially different text style for back button
   },
}); 