import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../../constants/theme';

const Header = ({ title, onBackPress, rightComponent, showBack = true, style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.left}>
      {showBack && onBackPress ? (
        <TouchableOpacity style={styles.backBtn} onPress={onBackPress}>
          <Ionicons name="arrow-back" size={24} color={colors.gray[900]} />
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

const styles = StyleSheet.create({
  container:   { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: spacing.md, paddingHorizontal: spacing.xl, backgroundColor: colors.white, ...shadows.sm },
  left:        { width: 40, alignItems: 'flex-start' },
  center:      { flex: 1, alignItems: 'center', paddingHorizontal: spacing.sm },
  right:       { width: 40, alignItems: 'flex-end' },
  backBtn:     { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center' },
  title:       { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  placeholder: { width: 40 },
});

export default Header;
