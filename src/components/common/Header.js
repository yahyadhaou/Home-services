import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/ThemeContext';

const Header = ({ title, onBackPress, rightComponent, showBack = true, style }) => {
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }, style]}>
      <View style={styles.left}>
        {showBack && onBackPress ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBackPress}>
            <Ionicons name="arrow-back" size={16} color={d.text} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.right}>
        {rightComponent || <View style={styles.placeholder} />}
      </View>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container:   { flexDirection: 'row', alignItems: 'center', paddingBottom: 14, paddingHorizontal: 18, backgroundColor: d.canvas, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  left:        { width: 32, alignItems: 'flex-start' },
  center:      { flex: 1, alignItems: 'center', paddingHorizontal: 8 },
  right:       { width: 32, alignItems: 'flex-end' },
  backBtn:     { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  title:       { fontSize: 15, fontWeight: '700', color: d.text },
  placeholder: { width: 30 },
});

export default Header;
