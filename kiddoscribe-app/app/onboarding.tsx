import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();
  const [showDobGate, setShowDobGate] = useState(false);

  const handleGetStarted = () => {
    // Show the Date of Birth verification gate
    setShowDobGate(true);
  };

  const handleDobContinue = () => {
    // TODO: Implement actual DOB validation (COPPA)
    console.log('DOB Continue pressed');
    // After successful verification, navigate to main app or sign up/in
    router.replace('/(tabs)/library');
  };

  const handleSignIn = () => {
    console.log('Sign in pressed');
    // TODO: Navigate to a dedicated Sign In screen or show modal
    router.replace('/(tabs)/library'); // Placeholder navigation
  };

  if (showDobGate) {
    return (
      <View style={styles.container}>
        <Text style={styles.dobTitle}>Verify Your Age</Text>
        <Text style={styles.dobText}>Before we begin, please verify you are an adult (18+).</Text>
        <View style={styles.dobInputContainer}>
           {/* TODO: Use proper Date Picker components */}
           <TextInput placeholder="Month" style={styles.dobInput} keyboardType="numeric" />
           <TextInput placeholder="Day" style={styles.dobInput} keyboardType="numeric" />
           <TextInput placeholder="Year" style={styles.dobInput} keyboardType="numeric" />
        </View>
        <Pressable style={styles.button} onPress={handleDobContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KiddoScribe</Text>
      {/* Placeholder for Hero Image/Carousel */}
      <View style={styles.carouselPlaceholder}>
        <Text>[Hero Image / Carousel Area]</Text>
      </View>
      <Text style={styles.description}>Create magical stories for young readers</Text>
      {/* Placeholder for Carousel Indicators */}
      <Text style={styles.carouselIndicatorPlaceholder}>• ○ ○</Text>
      <Text style={styles.carouselSlideDesc}>[Short description]</Text>

      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>I'm a Parent/Teacher</Text>
      </Pressable>

      <Pressable onPress={handleSignIn}>
        <Text style={styles.signInText}>Already have an account? Sign in here</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7', // Light background
  },
  title: {
    fontSize: 32, // Larger title
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  carouselPlaceholder: {
    width: '90%',
    height: 150,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
  },
  description: {
    fontSize: 18, // Slightly larger description
    textAlign: 'center',
    marginBottom: 15,
    color: '#555',
  },
  carouselIndicatorPlaceholder: {
    fontSize: 24,
    marginBottom: 5,
    color: '#ccc',
  },
  carouselSlideDesc: {
    fontSize: 14,
    color: '#777',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff', // Primary button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded corners
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInText: {
    color: '#007bff',
    marginTop: 10,
    fontSize: 14,
  },
  // DOB Gate Styles
  dobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  dobText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
    paddingHorizontal: 10,
  },
  dobInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginBottom: 30,
  },
  dobInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '25%', // Adjust as needed
    textAlign: 'center',
    fontSize: 16,
  },
}); 