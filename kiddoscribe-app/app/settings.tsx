import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Pressable, 
  ScrollView, 
  ActivityIndicator, 
  Alert,
  Switch 
} from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPro, setIsPro] = useState(false);
  
  // Toggle settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(false);
  
  const handleSubscribe = () => {
    setIsProcessing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsProcessing(false);
      setIsPro(true);
      
      // Success message
      Alert.alert(
        'Successfully Subscribed!', 
        'Welcome to KiddoScribe Pro! You now have unlimited image generations and premium features.',
        [{ text: 'OK' }]
      );
    }, 2000);
  };
  
  const handleRestorePurchases = () => {
    setIsProcessing(true);
    
    // Simulate restore process
    setTimeout(() => {
      setIsProcessing(false);
      
      // In a real app, check if user has a subscription to restore
      const hasSubscription = Math.random() > 0.5; // Just for demo
      
      if (hasSubscription) {
        setIsPro(true);
        Alert.alert('Success', 'Your Pro subscription has been restored!');
      } else {
        Alert.alert('No Subscription Found', 'We couldn\'t find an active subscription linked to your account.');
      }
    }, 1500);
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Link href="/(tabs)/library" asChild>
          <Pressable>
            <Text style={styles.headerLink}>← Back</Text>
          </Pressable>
        </Link>
        <Text style={styles.headerTitle}>Settings & Pro</Text>
        <View style={{ width: 50 }} /> {/* Spacer for alignment */}
      </View>
      
      {/* Pro Subscription Section */}
      <View style={styles.proSection}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/200x150?text=Premium+Features' }} 
          style={styles.proImage}
          resizeMode="contain"
        />
        
        <Text style={styles.proTitle}>
          {isPro ? 'You\'re a Pro Member!' : 'Unlock Premium Features'}
        </Text>
        
        {!isPro && (
          <>
            <View style={styles.proFeatureList}>
              <View style={styles.proFeatureItem}>
                <Text style={styles.proFeatureIcon}>✓</Text>
                <Text style={styles.proFeatureText}>Unlimited image generations</Text>
              </View>
              <View style={styles.proFeatureItem}>
                <Text style={styles.proFeatureIcon}>✓</Text>
                <Text style={styles.proFeatureText}>No watermarks on exports</Text>
              </View>
              <View style={styles.proFeatureItem}>
                <Text style={styles.proFeatureIcon}>✓</Text>
                <Text style={styles.proFeatureText}>Priority story generation</Text>
              </View>
              <View style={styles.proFeatureItem}>
                <Text style={styles.proFeatureIcon}>✓</Text>
                <Text style={styles.proFeatureText}>Advanced templates</Text>
              </View>
            </View>
            
            <View style={styles.pricingCard}>
              <Text style={styles.pricingTitle}>KiddoScribe Pro - $5.99/month</Text>
              <Text style={styles.pricingSubtitle}>7-day free trial</Text>
            </View>
            
            <Pressable 
              style={[styles.subscribeButton, isProcessing && styles.disabledButton]} 
              onPress={handleSubscribe}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
              )}
            </Pressable>
            
            <Pressable 
              style={styles.restoreButton} 
              onPress={handleRestorePurchases}
              disabled={isProcessing}
            >
              <Text style={styles.restoreText}>Restore Purchases</Text>
            </Pressable>
          </>
        )}
        
        {isPro && (
          <View style={styles.proMemberInfo}>
            <Text style={styles.proMemberText}>
              You have unlimited access to all premium features.
            </Text>
            <Text style={styles.proMemberSubtext}>
              Your next billing date is May 17, 2025
            </Text>
            
            <Pressable 
              style={styles.managePlanButton} 
              onPress={() => Alert.alert('Manage Subscription', 'This would open your subscription management options.')}
            >
              <Text style={styles.managePlanText}>Manage Plan</Text>
            </Pressable>
          </View>
        )}
      </View>
      
      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Push Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#e9ecef', true: '#007bff' }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Auto-Save</Text>
          <Switch
            value={autoSaveEnabled}
            onValueChange={setAutoSaveEnabled}
            trackColor={{ false: '#e9ecef', true: '#007bff' }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Theme</Text>
          <Switch
            value={darkThemeEnabled}
            onValueChange={setDarkThemeEnabled}
            trackColor={{ false: '#e9ecef', true: '#007bff' }}
            thumbColor="#fff"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Pressable 
            style={styles.settingButton} 
            onPress={() => Alert.alert('Account', 'Account management would open here')}
          >
            <Text style={styles.settingButtonText}>Manage Account</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.settingButton, styles.dangerButton]} 
            onPress={() => Alert.alert('Sign Out', 'Are you sure?', [
              { text: 'Cancel' },
              { text: 'Sign Out', onPress: () => router.replace('/onboarding') }
            ])}
          >
            <Text style={styles.settingButtonText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
      
      {/* App Info */}
      <View style={styles.appInfoSection}>
        <Text style={styles.appVersion}>KiddoScribe v1.0.0</Text>
        <Text style={styles.appCopyright}>© 2025 KiddoScribe Inc.</Text>
        
        <View style={styles.linksContainer}>
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Text style={styles.linkSeparator}>•</Text>
          <Text style={styles.linkText}>Terms of Service</Text>
          <Text style={styles.linkSeparator}>•</Text>
          <Text style={styles.linkText}>Help</Text>
        </View>
      </View>
    </ScrollView>
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
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  headerLink: {
    fontSize: 16,
    color: '#007bff',
    width: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  proSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 10,
    borderBottomColor: '#f8f9fa',
  },
  proImage: {
    width: 150,
    height: 120,
    marginBottom: 20,
  },
  proTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  proFeatureList: {
    width: '100%',
    marginBottom: 20,
  },
  proFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  proFeatureIcon: {
    color: '#28a745',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: 20,
    textAlign: 'center',
  },
  proFeatureText: {
    fontSize: 16,
    color: '#333',
  },
  pricingCard: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  pricingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  pricingSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 5,
  },
  subscribeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  restoreButton: {
    paddingVertical: 10,
  },
  restoreText: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
  },
  proMemberInfo: {
    width: '100%',
    alignItems: 'center',
  },
  proMemberText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  proMemberSubtext: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 20,
  },
  managePlanButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  managePlanText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  settingsSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 10,
    borderBottomColor: '#f8f9fa',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  settingButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  settingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  appInfoSection: {
    padding: 20,
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: '#adb5bd',
    marginBottom: 15,
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
    padding: 5,
  },
  linkSeparator: {
    color: '#adb5bd',
    fontSize: 14,
    padding: 5,
  },
});