import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

/**
 * Small bordered pill — used for booking status, availability, verified tags.
 */
const Badge = ({ label, color, backgroundColor, style }) => (
  <View style={[styles.base, { borderColor: color, backgroundColor: backgroundColor || color + '18' }, style]}>
    <Text style={[styles.text, { color }]}>{typeof label === 'string' ? label.toUpperCase() : label}</Text>
  </View>
);

const styles = StyleSheet.create({
  base: { borderRadius: 6, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  text: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3, fontFamily: MONO },
});

export default Badge;
