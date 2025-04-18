import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Enum for story generation stages
enum GenerationStage {
  DRAFT = 'draft',
  GENERATING_TEXT = 'generating_text',
  GENERATING_IMAGES = 'generating_images',
  READY = 'ready'
}

export default function ProgressScreen() {
  const router = useRouter();
  const { title = 'Untitled Story' } = useLocalSearchParams<{ title?: string }>();

  const [currentStage, setCurrentStage] = useState<GenerationStage>(GenerationStage.DRAFT);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('2:30');

  // Mock generation process (logic remains the same)
  useEffect(() => {
    const stages = [
      { stage: GenerationStage.DRAFT, duration: 500, progress: 0.1 },
      { stage: GenerationStage.GENERATING_TEXT, duration: 4000, progress: 0.5 },
      { stage: GenerationStage.GENERATING_IMAGES, duration: 5000, progress: 0.9 },
      { stage: GenerationStage.READY, duration: 1000, progress: 1 }
    ];

    let currentStageIndex = 0;
    const initialDuration = stages[currentStageIndex]?.duration || 1000;

    const intervalId = setInterval(() => {
      if (currentStageIndex < stages.length) {
        const stageInfo = stages[currentStageIndex];
        setCurrentStage(stageInfo.stage);
        setProgress(stageInfo.progress);

        if (stageInfo.stage === GenerationStage.GENERATING_TEXT) setEstimatedTime('2:00');
        if (stageInfo.stage === GenerationStage.GENERATING_IMAGES) setEstimatedTime('0:45');
        if (stageInfo.stage === GenerationStage.READY) setEstimatedTime('0:00');

        currentStageIndex++;

        if (stageInfo.stage === GenerationStage.READY) {
          clearInterval(intervalId);
          setTimeout(() => {
            const mockStoryId = `story_${Date.now()}`;
            router.replace(`/editor/${mockStoryId}`);
          }, 1000);
        }
      } else {
         // Should ideally not happen if logic is correct, but clear interval just in case
          clearInterval(intervalId);
      }
      // Note: This interval logic is slightly off - it advances stage *before* the duration.
      // For a real app, you'd likely use backend events or Promises.
    }, initialDuration); // Interval uses the *first* stage's duration, fixed below

    // --- Refined Interval Logic (Example) ---
    // Clear the potentially flawed interval started above
    clearInterval(intervalId);

    let stageIdx = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const runStage = () => {
        if (stageIdx < stages.length) {
            const stageInfo = stages[stageIdx];
            console.log("Running stage:", stageInfo.stage);
            setCurrentStage(stageInfo.stage);
            setProgress(stageInfo.progress);

            // Update estimated time (mock)
            if (stageInfo.stage === GenerationStage.GENERATING_TEXT) setEstimatedTime('2:00');
            if (stageInfo.stage === GenerationStage.GENERATING_IMAGES) setEstimatedTime('0:45');
            if (stageInfo.stage === GenerationStage.READY) setEstimatedTime('0:00');

            stageIdx++; // Prepare for next stage

             if (stageInfo.stage === GenerationStage.READY) {
                // Final stage, navigate after short delay
                 timeoutId = setTimeout(() => {
                    const mockStoryId = `story_${Date.now()}`;
                    router.replace(`/editor/${mockStoryId}`);
                }, 1000);
             } else {
                 // Schedule the next stage
                timeoutId = setTimeout(runStage, stageInfo.duration);
             }
        }    
    }

    runStage(); // Start the first stage
    // --- End Refined Interval Logic ---


    return () => {
        // Cleanup function
        // clearInterval(intervalId); // Clear original interval if it was still running
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    };
  }, [router]);

  const getStageStatus = (stage: GenerationStage) => {
     const order = [
      GenerationStage.DRAFT,
      GenerationStage.GENERATING_TEXT,
      GenerationStage.GENERATING_IMAGES,
      GenerationStage.READY
    ];
    const currentStageIndex = order.indexOf(currentStage);
    const stageIndex = order.indexOf(stage);
    if (stageIndex < currentStageIndex) return 'completed';
    if (stageIndex === currentStageIndex) return 'current';
    return 'pending';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Creating Your Story...</Text>
      <Text style={styles.title}>{title}</Text>

      {/* Removed Progress.Bar and its container */}
      {/* Replace with simple text indicator */}
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>Progress: {Math.round(progress * 100)}%</Text>
         <View style={[styles.simpleProgressBar, { width: `${progress * 100}%`}]} />
      </View>

      <View style={styles.stagesContainer}>
        {Object.values(GenerationStage).map((stage) => {
          const status = getStageStatus(stage);
          const stageText = stage.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return (
            <View key={stage} style={styles.stageItem}>
              <Text style={[
                styles.stageName,
                status === 'completed' && styles.stageCompleted,
                status === 'current' && styles.stageCurrent
              ]}>
                {stageText}
              </Text>
              <Text style={styles.stageIndicator}>
                {status === 'completed' ? '✓' : status === 'current' ? '⏳' : ''} {/* Using hourglass for current */}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.estimatedTime}>Estimated Time: {estimatedTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    color: '#555',
    fontStyle: 'italic',
  },
  // Styles for the text progress indicator
  progressTextContainer: {
    width: 300,
    marginBottom: 30,
    alignItems: 'center',
    height: 28, // Height for text + bar
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative', // For positioning the bar
  },
  progressText: {
    fontSize: 14,
    color: '#333',
    position: 'absolute',
    zIndex: 1, // Text above bar
    textAlign: 'center',
    width: '100%',
    lineHeight: 26,
  },
  simpleProgressBar: {
    height: '100%',
    backgroundColor: '#a0d4ff', // Light blue progress
    position: 'absolute',
    left: 0,
    top: 0,
  },
  // Removed progressBarContainer style
  stagesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    minHeight: 60,
  },
  stageItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  stageName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#adb5bd',
    marginBottom: 5,
    minHeight: 30,
  },
  stageCompleted: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  stageCurrent: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  stageIndicator: {
    fontSize: 10,
    color: '#007bff',
    height: 12,
  },
  estimatedTime: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 10,
  },
});