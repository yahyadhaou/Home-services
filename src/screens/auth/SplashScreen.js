import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../constants/theme';

const SplashScreen = ({ navigation }) => {
  const fadeAnim  = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 20, friction: 7, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => navigation.replace('Onboarding'), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={[colors.primary.main, colors.primary.light, colors.accent.main]} style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoBox}><Text style={styles.logoLetter}>H</Text></View>
        <Text style={styles.brandText}>HomeServices</Text>
        <Text style={styles.tagline}>Sofortige Hilfe für Ihr Zuhause</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container:     { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoContainer: { alignItems: 'center' },
  logoBox:       { width: 100, height: 100, backgroundColor: colors.white, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg },
  logoLetter:    { fontSize: 56, fontWeight: typography.fontWeight.bold, color: colors.accent.main },
  brandText:     { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.white, marginBottom: spacing.xs },
  tagline:       { fontSize: typography.fontSize.base, color: colors.white, opacity: 0.9 },
});

export default SplashScreen;
