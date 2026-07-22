import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../constants/ThemeContext';

const ICONS = {
  Home: 'home-outline',
  Search: 'search-outline',
  MyBookings: 'calendar-outline',
  Chat: 'chatbubble-outline',
  Profile: 'person-outline',
};

// Instrument-style codes — a design device (like flight/dispatch codes), kept
// identical across languages rather than translated as sentences.
const CODES = { Home: 'HOM', Search: 'SRCH', MyBookings: 'JOBS', Chat: 'MSG', Profile: 'PRO' };

const TechnicalTabBar = ({ state, navigation }) => {
  const { colors } = useTheme();
  const d = colors.dispatch;

  return (
    <View style={[styles.bar, { backgroundColor: d.tabBg, borderTopColor: d.lineSoft }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.tab} activeOpacity={0.7}>
            <Ionicons name={ICONS[route.name]} size={18} color={isFocused ? d.line : d.textSoft} />
            <Text style={[styles.code, { color: isFocused ? d.line : d.textSoft }]}>{CODES[route.name]}</Text>
            {isFocused && <View style={[styles.signal, { backgroundColor: d.amber }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', height: 60, borderTopWidth: 1, alignItems: 'center', justifyContent: 'space-around' },
  tab: { alignItems: 'center', justifyContent: 'center', gap: 3, flex: 1, height: '100%' },
  code: { fontSize: 9, fontWeight: '600', letterSpacing: 0.5, fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }) },
  signal: { width: 3, height: 3, borderRadius: 1.5, position: 'absolute', bottom: 6 },
});

export default TechnicalTabBar;
