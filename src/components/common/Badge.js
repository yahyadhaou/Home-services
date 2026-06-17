import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { typography, spacing, borderRadius } from '../../constants/theme';

/**
 * Small colored pill — used for booking status, availability, verified tags.
 */
const Badge = ({ label, color, backgroundColor, style }) => (
  <View style={[styles.base, { backgroundColor: backgroundColor || color + '18' }, style]}>
    <Text style={[styles.text, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  base: { borderRadius: borderRadius.full, paddingHorizontal: spacing.sm, paddingVertical: 4, alignSelf: 'flex-start' },
  text: { fontSize: 11, fontWeight: typography.fontWeight.semiBold },
});

export default Badge;
