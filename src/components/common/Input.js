import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const Input = ({
  label, error, icon, secureTextEntry = false, showPasswordToggle = false,
  style, containerStyle, ...props
}) => {
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label.toUpperCase()}</Text> : null}
      <View style={[styles.wrapper, focused && styles.focused, error && styles.errored]}>
        {icon ? (
          <Ionicons name={icon} size={16} color={focused ? d.line : d.textSoft} style={styles.iconLeft} />
        ) : null}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={d.textSoft}
          secureTextEntry={secureTextEntry && !visible}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {secureTextEntry && showPasswordToggle ? (
          <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.iconRight}>
            <Ionicons name={visible ? 'eye-outline' : 'eye-off-outline'} size={16} color={d.textSoft} />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { marginBottom: 14 },
  label:     { fontSize: 10, fontWeight: '700', letterSpacing: 0.4, color: d.textSoft, marginBottom: 6, fontFamily: MONO },
  wrapper:   { flexDirection: 'row', alignItems: 'center', backgroundColor: d.panel, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, paddingHorizontal: 12 },
  focused:   { borderColor: d.line },
  errored:   { borderColor: d.danger },
  input:     { flex: 1, paddingVertical: 12, fontSize: 14, color: d.text },
  iconLeft:  { marginRight: 8 },
  iconRight: { padding: 4, marginLeft: 8 },
  error:     { fontSize: 11, color: d.danger, marginTop: 4 },
});

export default Input;
