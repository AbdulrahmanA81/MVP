import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TouchableOpacity } from 'react-native';
import { useRouter, Link } from 'expo-router';
import Slider from '@react-native-community/slider';
// TODO: Import or create a Dropdown component

export default function WizardStep1() {
  const router = useRouter();
  const [ageRange, setAgeRange] = useState(5); // Example default age
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedVocab, setSelectedVocab] = useState<string>('Beginner');
  const [isVocabModalVisible, setIsVocabModalVisible] = useState(false);

  const themes = ['Space', 'Ocean', 'Farm', 'Magic']; // Add 'More+' later
  const vocabLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleCancel = () => {
    // Navigate back to the library or previous screen
    router.replace('/(tabs)/library');
  };

  const handleSelectVocab = (level: string) => {
    setSelectedVocab(level);
    setIsVocabModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable onPress={handleCancel}>
            <Text style={styles.headerLink}>← Cancel</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Story Wizard 1/3</Text>
        <Link href="/(wizard)/step2" asChild>
            <Pressable><Text style={styles.headerLink}>→</Text></Pressable>
        </Link>
      </View>

      {/* Age Range */}
      <Text style={styles.label}>Age Range</Text>
      <Text style={styles.ageValue}>{ageRange} years</Text>
      {/* Placeholder for Slider */}
      {/* Replace with actual Slider component, e.g., @react-native-community/slider */}
      <Slider
          style={{width: '100%', height: 40}}
          minimumValue={3}
          maximumValue={8}
          step={1}
          value={ageRange}
          onValueChange={setAgeRange}
          minimumTrackTintColor="#007bff"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#007bff"
      />

      {/* Theme */}
      <Text style={styles.label}>Theme</Text>
      <View style={styles.themeContainer}>
        {themes.map((theme) => (
          <Pressable
            key={theme}
            style={[styles.themeButton, selectedTheme === theme && styles.selectedThemeButton]}
            onPress={() => setSelectedTheme(theme)}
          >
            <Text style={[styles.themeButtonText, selectedTheme === theme && styles.selectedThemeButtonText]}>
              {theme}
            </Text>
          </Pressable>
        ))}
        {/* TODO: Add 'More+' button functionality */}
        <Pressable style={styles.themeButton} onPress={() => console.log('More themes...')}>
           <Text style={styles.themeButtonText}>More+</Text>
        </Pressable>
      </View>

      {/* Vocabulary Level */}
      <Text style={styles.label}>Vocabulary Level</Text>
      {/* Placeholder for Dropdown */}
      <Pressable style={styles.dropdownPlaceholder} onPress={() => setIsVocabModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedVocab}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </Pressable>

      {/* Vocabulary Modal */}
       <Modal
        animationType="fade"
        transparent={true}
        visible={isVocabModalVisible}
        onRequestClose={() => {
          setIsVocabModalVisible(!isVocabModalVisible);
        }}>
        <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setIsVocabModalVisible(false)} // Close on touching outside
        >
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Select Vocabulary Level</Text>
                {vocabLevels.map((level) => (
                    <Pressable
                        key={level}
                        style={styles.modalOption}
                        onPress={() => handleSelectVocab(level)}
                    >
                        <Text style={styles.modalOptionText}>{level}</Text>
                    </Pressable>
                ))}
                 <Pressable
                    style={[styles.modalOption, styles.modalCloseButton]}
                    onPress={() => setIsVocabModalVisible(false)}
                >
                    <Text style={styles.modalCloseButtonText}>Close</Text>
                </Pressable>
            </View>
        </TouchableOpacity>
      </Modal>

      {/* Navigation Button (only appears in header for this step) */}
       {/* Optional: Add a dedicated Next button at the bottom if preferred */}
        {/* <Link href="/(wizard)/step2" asChild>
            <Pressable style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
        </Link> */}    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust for status bar or custom header
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  ageValue: {
      textAlign: 'center',
      fontSize: 16,
      color: '#555',
      marginBottom: 5,
  },
  // Removed sliderPlaceholder styles
  themeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  themeButton: {
    backgroundColor: '#e9ecef',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  selectedThemeButton: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  themeButtonText: {
    fontSize: 14,
    color: '#495057',
  },
  selectedThemeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownPlaceholder: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    marginBottom: 30,
  },
  dropdownText: {
    fontSize: 16,
    color: '#495057',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#495057',
  },
   nextButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30, // Add margin if placing at bottom
    },
    nextButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
  // Modal styles
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%', // Adjust width as needed
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#007bff',
  },
  modalCloseButton: {
      marginTop: 10,
      borderBottomWidth: 0, // No line for the close button
      backgroundColor: '#6c757d',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
  },
  modalCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 