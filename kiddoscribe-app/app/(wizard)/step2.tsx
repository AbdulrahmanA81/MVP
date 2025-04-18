import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function WizardStep2() {
  const router = useRouter();
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const lessons = ['Colors', 'Counting', 'Letters', 'Emotions'];
  const templates = ['Adventure', 'Bedtime', 'Learning'];

  const toggleLesson = (lesson: string) => {
    setSelectedLessons(prev =>
      prev.includes(lesson)
        ? prev.filter(l => l !== lesson)
        : [...prev, lesson]
    );
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
         <Link href="/(wizard)/step1" asChild>
            <Pressable><Text style={styles.headerLink}>← Back</Text></Pressable>
        </Link>
        <Text style={styles.headerTitle}>Story Wizard 2/3</Text>
        <Link href="/(wizard)/step3" asChild>
             <Pressable><Text style={styles.headerLink}>→</Text></Pressable>
        </Link>
      </View>

      {/* Lessons */}
      <Text style={styles.label}>Lessons (Optional)</Text>
      <View style={styles.buttonGroupContainer}>
        {lessons.map((lesson) => (
          <Pressable
            key={lesson}
            style={[styles.selectableButton, selectedLessons.includes(lesson) && styles.selectedButton]}
            onPress={() => toggleLesson(lesson)}
          >
            <Text style={[styles.buttonText, selectedLessons.includes(lesson) && styles.selectedButtonText]}>
              {lesson}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Template */}
      <Text style={styles.label}>Template</Text>
      <View style={styles.buttonGroupContainer}>
        {templates.map((template) => (
          <Pressable
            key={template}
            style={[styles.templateButton, selectedTemplate === template && styles.selectedButton]}
            onPress={() => setSelectedTemplate(template)}
          >
             {/* TODO: Add image placeholder if needed */}
            <Text style={[styles.buttonText, styles.templateButtonText, selectedTemplate === template && styles.selectedButtonText]}>
              {template}
            </Text>
          </Pressable>
        ))}
      </View>

       {/* Navigation Buttons */}
        <View style={styles.navButtonContainer}>
            <Link href="/(wizard)/step1" asChild>
                <Pressable style={[styles.navButton, styles.backButton]}>
                <Text style={[styles.navButtonText, styles.backButtonText]}>Back</Text>
                </Pressable>
            </Link>
            <Link href="/(wizard)/step3" asChild>
                <Pressable style={[styles.navButton, styles.nextButton]}>
                <Text style={styles.navButtonText}>Next</Text>
                </Pressable>
            </Link>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  buttonGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginLeft: -5, // Counteract button margin
  },
  selectableButton: {
    backgroundColor: '#e9ecef',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  templateButton: {
      backgroundColor: '#f8f9fa',
      paddingVertical: 20,
      paddingHorizontal: 15,
      borderRadius: 8,
      margin: 5,
      borderWidth: 1,
      borderColor: '#dee2e6',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100, // Give templates more space
      minHeight: 80,
  },
  selectedButton: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  buttonText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
  },
   templateButtonText: {
      fontWeight: 'bold',
   },
  selectedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
    navButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto', // Push buttons to the bottom
        marginBottom: 20, // Spacing from bottom edge
    },
    navButton: {
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    backButton: {
        backgroundColor: '#6c757d',
    },
    nextButton: {
        backgroundColor: '#007bff',
    },
    navButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButtonText: {
      // Potentially different text style for back button
    },
}); 