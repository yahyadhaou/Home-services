import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

const Card = ({ children, variant = 'elevated', padding, style, ...props }) => {
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const resolvedPadding = padding !== undefined ? padding : 14;
  return (
    <View style={[styles.base, styles[variant], { padding: resolvedPadding }, style]} {...props}>
      {children}
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  base:     { backgroundColor: d.panel, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft },
  elevated: {},
  outlined: { borderColor: d.line },
  flat:     { backgroundColor: d.canvas, borderColor: d.lineSoft },
});

export default Card;
