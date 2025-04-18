import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function WizardStep3() {
  const router = useRouter();

  const handleGenerateStory = () => {
    console.log("Generate Story pressed");
    // TODO: Navigate to Progress Screen
    // router.push('/progress'); // Assuming a progress screen route
     router.replace('/(tabs)/library'); // Placeholder navigation
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
         <Link href="/(wizard)/step2" asChild>
            <Pressable><Text style={styles.headerLink}>← Back</Text></Pressable>
        </Link>
        <Text style={styles.headerTitle}>Story Wizard 3/3</Text>
        {/* No next arrow here */}
        <View style={{width: 50}} />
      </View>

      <Text style={styles.title}>Story Summary</Text>

       {/* TODO: Fetch and display actual summary data */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryItem}>Title: [Untitled Space Adventure]</Text>
        <Text style={styles.summaryItem}>Age Range: 4-6 years</Text>
        <Text style={styles.summaryItem}>Theme: Space</Text>
        <Text style={styles.summaryItem}>Vocabulary: Beginner</Text>
        <Text style={styles.summaryItem}>Lessons: Counting</Text>
        <Text style={styles.summaryItem}>Template: Adventure</Text>
      </View>

      <Text style={styles.tierInfo}>Free Tier: 5 images remaining</Text>
      {/* TODO: Add Upgrade to Pro link/button */}
      <Text style={styles.upgradeLink}>Upgrade to Pro</Text>

      <View style={styles.buttonContainer}>
        <Link href="/(wizard)/step2" asChild>
            <Pressable style={[styles.button, styles.backButton]}>
            <Text style={[styles.buttonText, styles.backButtonText]}>Back</Text>
            </Pressable>
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
  headerLink: {
    fontSize: 16,
    color: '#007bff',
    width: 50, // Ensure alignment
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
  upgradeLink: {
      fontSize: 14,
      color: '#007bff',
      textAlign: 'center',
      marginBottom: 30,
      textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
      backgroundColor: '#6c757d',
  },
  generateButton: {
      backgroundColor: '#28a745', // Success color for generate
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