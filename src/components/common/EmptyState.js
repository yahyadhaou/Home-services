import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../constants/ThemeContext';

const EmptyState = ({ icon = 'alert-circle-outline', title, subtitle, actionLabel, onAction }) => {
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={30} color={d.textSoft} />
      </View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {actionLabel && onAction ? (
        <TouchableOpacity style={styles.actionBtn} onPress={onAction}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container:  { alignItems: 'center', justifyContent: 'center', paddingTop: 70, paddingHorizontal: 18 },
  iconWrap:   { width: 64, height: 64, borderRadius: 16, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  title:      { fontSize: 16, fontWeight: '700', color: d.text, textAlign: 'center' },
  subtitle:   { fontSize: 13, color: d.textSoft, textAlign: 'center', marginTop: 6, lineHeight: 19 },
  actionBtn:  { marginTop: 18, backgroundColor: d.line, paddingHorizontal: 20, paddingVertical: 11, borderRadius: 10 },
  actionText: { fontSize: 13, fontWeight: '700', color: d.canvas },
});

export default EmptyState;
