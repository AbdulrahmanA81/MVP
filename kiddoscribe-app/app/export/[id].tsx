import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Switch, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';

// Mock data for export options
type ExportFormat = 'pdf' | 'epub';

interface StoryData {
  id: string;
  title: string;
  coverImage: string;
  isPro: boolean;
}

export default function ExportScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  // State for export options
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  const [includeWatermark, setIncludeWatermark] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  // Mock story data (in a real app, you would fetch this)
  const [story, setStory] = useState<StoryData | null>(null);

  // Mock fetching story and user data
  useEffect(() => {
    console.log(`Fetching export info for story ID: ${id}`);
    // Simulate API call
    const timer = setTimeout(() => {
      setStory({
        id: String(id),
        title: `Space Adventure ${id?.substring(0, 5)} Export`,
        coverImage: 'https://via.placeholder.com/300x400?text=Book+Cover',
        isPro: false // Mock user subscription status (set to true to test Pro features)
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  // Effect to set initial watermark state based on Pro status
  useEffect(() => {
    if (story) {
      setIncludeWatermark(!story.isPro);
    }
  }, [story]);

  const handleExport = () => {
    setIsExporting(true);
    console.log(`Exporting story ${id} as ${exportFormat}, Watermark: ${includeWatermark}`);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);

      // Show success message
      Alert.alert(
        'Export Successful',
        `Your story has been exported as ${exportFormat.toUpperCase()}.`, // Removed 'ready to read' as it's just export
        [
          {
            text: 'Back to Editor',
            onPress: () => router.back() // Go back to previous screen (Editor)
          },
          {
            text: 'View in Library',
            onPress: () => router.replace('/(tabs)/library')
          }
        ]
      );
    }, 2000);
  };

  if (!story) {
    // Show loading state
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading Export Options...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        {/* Removed asChild from Link */}
        <Link href={`/editor/${id}`} style={styles.headerButton}>
           <Text style={styles.headerLinkText}>← Back</Text>
        </Link>
        <Text style={styles.headerTitle}>Export Options</Text>
        <View style={styles.headerButton} /> {/* Empty view for spacing */}
      </View>

      <View style={styles.content}>
        {/* Cover Preview */}
        <View style={styles.coverContainer}>
          <Image
            source={{ uri: story.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <Text style={styles.storyTitle}>{story.title}</Text>
        </View>

        {/* Export Format Options */}
        <Text style={styles.sectionTitle}>Export Format</Text>
        <View style={styles.formatOptions}>
          <Pressable
            style={styles.formatOptionContainer}
            onPress={() => setExportFormat('pdf')}
          >
            <View style={styles.radioContainer}>
              <View style={[styles.radioOuter, exportFormat === 'pdf' && styles.radioOuterSelected]}>
                {exportFormat === 'pdf' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.formatOptionText}>PDF Document</Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.formatOptionContainer}
            onPress={() => setExportFormat('epub')}
          >
            <View style={styles.radioContainer}>
              <View style={[styles.radioOuter, exportFormat === 'epub' && styles.radioOuterSelected]}>
                {exportFormat === 'epub' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.formatOptionText}>EPUB E-Book</Text>
            </View>
          </Pressable>
        </View>

        {/* Watermark Option */}
        <Text style={styles.sectionTitle}>Options</Text>
        <View style={styles.optionContainer}>
          <View style={styles.switchOption}>
            <Text style={styles.optionText}>Include watermark</Text>
            <Switch
              value={includeWatermark}
              onValueChange={setIncludeWatermark}
              trackColor={{ false: '#d3d3d3', true: '#81b0ff' }} // Adjusted colors
              thumbColor={includeWatermark ? '#007bff' : '#f4f3f4'}
              ios_backgroundColor="#e9ecef"
              disabled={story.isPro} // Disable toggle *if* user is Pro (can't add watermark)
            />
          </View>
          <Text style={styles.proInfoText}>
            {story.isPro
             ? 'Watermark automatically removed for Pro users.'
             : 'ⓘ Upgrade to Pro to remove watermark.'}
          </Text>
        </View>

        {/* Export Button */}
        <Pressable
          style={[styles.exportButton, isExporting && styles.exportingButton]}
          onPress={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.exportButtonText}>Export Now</Text>
          )}
        </Pressable>

        {/* Pro Upgrade Link */}
        {!story.isPro && (
            /* Removed asChild from Link */
          <Link href="/(tabs)/settings" style={styles.upgradeLinkContainer}>
            <Text style={styles.upgradeLinkText}>Upgrade to Pro</Text>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  headerButton: { // Style for the Pressable/Link area
    padding: 10,
    minWidth: 60,
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
    marginHorizontal: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  coverImage: {
    width: 150,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  formatOptions: {
    marginBottom: 30,
  },
  formatOptionContainer: {
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ced4da',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: '#007bff',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  formatOptionText: {
    fontSize: 16,
    color: '#495057',
  },
  optionContainer: {
    marginBottom: 30,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#495057',
  },
  proInfoText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 5,
    // marginLeft: 10, // Removed margin if text aligns with switch
  },
  exportButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  exportingButton: {
    backgroundColor: '#6c757d',
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  upgradeLinkContainer: { // Style for the Link container
    alignItems: 'center', // Center the text
  },
  upgradeLinkText: { // Style for the text itself
    textAlign: 'center',
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
}); 