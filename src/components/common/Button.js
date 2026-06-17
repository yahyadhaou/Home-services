import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const Button = ({
  children, onPress, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon, iconPosition = 'right',
  style, textStyle, ...props
}) => {
  const iconSize  = size === 'lg' ? 22 : 18;
  const iconColor = (variant === 'primary' || variant === 'secondary') ? colors.white : colors.primary.main;

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], styles['size_' + size], (disabled || loading) && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <View style={styles.row}>
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.iconLeft} />
          )}
          <Text style={[styles.text, styles['text_' + variant], styles['textSize_' + size], textStyle]}>
            {children}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={iconSize} color={iconColor} style={styles.iconRight} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: { borderRadius: borderRadius.md, alignItems: 'center', justifyContent: 'center' },
  row:  { flexDirection: 'row', alignItems: 'center' },

  primary:   { backgroundColor: colors.accent.main, ...shadows.md },
  secondary: { backgroundColor: colors.secondary.main },
  outline:   { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.primary.main },
  ghost:     { backgroundColor: 'transparent' },

  size_sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  size_md: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
  size_lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl },

  text:           { fontWeight: typography.fontWeight.semiBold },
  text_primary:   { color: colors.white },
  text_secondary: { color: colors.white },
  text_outline:   { color: colors.primary.main },
  text_ghost:     { color: colors.primary.main },

  textSize_sm: { fontSize: typography.fontSize.sm },
  textSize_md: { fontSize: typography.fontSize.base },
  textSize_lg: { fontSize: typography.fontSize.lg },

  disabled:  { opacity: 0.5 },
  iconLeft:  { marginRight: spacing.xs },
  iconRight: { marginLeft: spacing.xs },
});

export default Button;
