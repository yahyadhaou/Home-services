import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const Button = ({
  children, onPress, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon, iconPosition = 'right',
  style, textStyle, ...props
}) => {
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);

  const iconSize  = size === 'lg' ? 20 : 16;
  const iconColor = variant === 'primary' ? d.canvas : variant === 'ghost' ? d.line : d.text;

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

const createStyles = (d) => StyleSheet.create({
  base: { borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  row:  { flexDirection: 'row', alignItems: 'center' },

  primary:   { backgroundColor: d.line },
  secondary: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft },
  outline:   { backgroundColor: 'transparent', borderWidth: 1, borderColor: d.lineSoft },
  ghost:     { backgroundColor: 'transparent' },

  size_sm: { paddingVertical: 8, paddingHorizontal: 14 },
  size_md: { paddingVertical: 12, paddingHorizontal: 18 },
  size_lg: { paddingVertical: 15, paddingHorizontal: 22 },

  text:           { fontWeight: '700' },
  text_primary:   { color: d.canvas },
  text_secondary: { color: d.text },
  text_outline:   { color: d.text },
  text_ghost:     { color: d.line },

  textSize_sm: { fontSize: 12 },
  textSize_md: { fontSize: 14 },
  textSize_lg: { fontSize: 15 },

  disabled:  { opacity: 0.5 },
  iconLeft:  { marginRight: 8 },
  iconRight: { marginLeft: 8 },
});

export default Button;
