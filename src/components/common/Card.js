import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';

const Card = ({ children, variant = 'elevated', padding = spacing.md, style, ...props }) => (
  <View style={[styles.base, styles[variant], { padding }, style]} {...props}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  base:     { backgroundColor: colors.white, borderRadius: borderRadius.md },
  elevated: shadows.sm,
  outlined: { borderWidth: 1, borderColor: colors.gray[200] },
  flat:     { backgroundColor: colors.gray[50] },
});

export default Card;
