import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const Input = ({
  label, error, icon, secureTextEntry = false, showPasswordToggle = false,
  style, containerStyle, ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.wrapper, focused && styles.focused, error && styles.errored]}>
        {icon ? (
          <Ionicons name={icon} size={20} color={focused ? colors.primary.main : colors.gray[500]} style={styles.iconLeft} />
        ) : null}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.gray[400]}
          secureTextEntry={secureTextEntry && !visible}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {secureTextEntry && showPasswordToggle ? (
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.iconRight}>
            <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.gray[500]} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label:     { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: colors.gray[700], marginBottom: spacing.xs },
  wrapper:   { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.gray[50], borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.gray[200], paddingHorizontal: spacing.md },
  focused:   { borderColor: colors.primary.main, backgroundColor: colors.white },
  errored:   { borderColor: colors.status.error },
  input:     { flex: 1, paddingVertical: spacing.md, fontSize: typography.fontSize.base, color: colors.gray[900] },
  iconLeft:  { marginRight: spacing.sm },
  iconRight: { padding: spacing.xs, marginLeft: spacing.sm },
  error:     { fontSize: typography.fontSize.sm, color: colors.status.error, marginTop: spacing.xs },
});

export default Input;
