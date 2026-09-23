import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';
import { useApp } from '../../context/AppContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });
const MIN_DISPLAY_MS = 2200;

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { isAuthenticated, authChecked } = useApp();
  const d = colors.dispatch;
  const fadeAnim  = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const mountedAtRef = React.useRef(Date.now());

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 20, friction: 7, useNativeDriver: true }),
    ]).start();
  }, []);

  // Waits for both the minimum splash duration AND the on-start session
  // restore (AppContext tries a stored refresh token before this resolves)
  // — a returning user with a still-valid session skips straight to
  // MainTabs instead of seeing Onboarding/Login again. Tops up to the
  // minimum display time rather than waiting the full duration again once
  // authChecked flips true, so a fast session check doesn't double the wait.
  useEffect(() => {
    if (!authChecked) return undefined;
    const remaining = Math.max(0, MIN_DISPLAY_MS - (Date.now() - mountedAtRef.current));
    const timer = setTimeout(() => {
      navigation.replace(isAuthenticated ? 'MainTabs' : 'Onboarding');
    }, remaining);
    return () => clearTimeout(timer);
  }, [authChecked, isAuthenticated]);

  return (
    <View style={[styles.container, { backgroundColor: d.canvas }]}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={[styles.logoBox, { borderColor: d.line }]}>
          <Text style={[styles.logoLetter, { color: d.line }]}>H</Text>
        </View>
        <Text style={[styles.brandText, { color: d.text }]}>HomeServices</Text>
        <Text style={[styles.tagline, { color: d.textSoft }]}>INSTANT HELP FOR YOUR HOME</Text>
        <View style={styles.statusRow}>
          <View style={[styles.dot, { backgroundColor: d.amber }]} />
          <Text style={[styles.statusText, { color: d.textSoft }]}>DISPATCH SYSTEM ONLINE</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:     { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logoContainer: { alignItems: 'center' },
  logoBox:       { width: 88, height: 88, borderRadius: 20, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  logoLetter:    { fontSize: 44, fontWeight: '700' },
  brandText:     { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  tagline:       { fontSize: 11, letterSpacing: 1, fontFamily: MONO },
  statusRow:     { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 24 },
  dot:           { width: 6, height: 6, borderRadius: 3 },
  statusText:    { fontSize: 10, letterSpacing: 0.5, fontFamily: MONO },
});

export default SplashScreen;
