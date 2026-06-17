import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

/**
 * Reusable empty-list placeholder.
 */
const EmptyState = ({ icon = 'alert-circle-outline', title, subtitle, actionLabel, onAction }) => (
  <View style={styles.container}>
    <Ionicons name={icon} size={64} color={colors.gray[300]} />
    {title ? <Text style={styles.title}>{title}</Text> : null}
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    {actionLabel && onAction ? (
      <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
        <Text style={styles.actionText}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container:  { alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingHorizontal: spacing.xl },
  title:      { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semiBold, color: colors.gray[700], marginTop: spacing.md, textAlign: 'center' },
  subtitle:   { fontSize: typography.fontSize.base, color: colors.gray[500], textAlign: 'center', marginTop: spacing.sm, lineHeight: 22 },
  actionBtn:  { marginTop: spacing.xl, backgroundColor: colors.accent.main, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: borderRadius.full },
  actionText: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.white },
});

export default EmptyState;
