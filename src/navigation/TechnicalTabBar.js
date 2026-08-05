import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../constants/ThemeContext';
import { useApp } from '../context/AppContext';
import { getInitials } from '../utils';

// "Liquid Slide" floating console: a translucent capsule that floats clear of
// the bottom edge, with a single glowing indicator that slides beneath
// whichever tab is active. Icon-only — no per-tab labels — so the pill stays
// as quiet as the rest of the dispatch-board UI.
const ICONS = {
  Home: { off: 'home-outline', on: 'home' },
  Nearby: { off: 'map-outline', on: 'map' },
  MyBookings: { off: 'calendar-outline', on: 'calendar' },
  Relocation: { off: 'cube-outline', on: 'cube' },
};

const TAB_SIZE = 46;
const BLOB_SIZE = 40;
const PILL_PADDING = 6;

const restX = (index) => PILL_PADDING + index * TAB_SIZE + (TAB_SIZE - BLOB_SIZE) / 2;

const TechnicalTabBar = ({ state, navigation }) => {
  const { colors } = useTheme();
  const { user } = useApp();
  const insets = useSafeAreaInsets();
  const d = colors.dispatch;
  const blobRef = useRef(null);

  useEffect(() => {
    // React's own style-prop reconciliation for `left`/`transform` never
    // re-applies on this node after the first render (a genuine RN-web bug
    // hit repeatedly here — confirmed even backgroundColor updates fine on
    // the same node while `left` silently stays frozen). Writing the style
    // straight to the node bypasses that reconciliation entirely; the CSS
    // transition declared in `blobTransition` is what makes the jump smooth.
    const node = blobRef.current;
    const x = restX(state.index);
    if (!node) return;
    if (typeof node.setNativeProps === 'function') {
      node.setNativeProps({ style: { left: x } });
    } else if (node.style) {
      node.style.left = `${x}px`;
    }
  }, [state.index]);

  return (
    <View style={[styles.wrap, { backgroundColor: d.canvas, paddingBottom: insets.bottom + 14 }]} pointerEvents="box-none">
      <View style={[styles.pill, { backgroundColor: `${d.panel}F0`, borderColor: d.lineSoft }]}>
        <View
          ref={blobRef}
          style={[
            styles.blob,
            styles.blobTransition,
            { backgroundColor: d.line, shadowColor: d.line, left: restX(state.index) },
          ]}
        />
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };
          const tintColor = isFocused ? d.canvas : d.textSoft;

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tab} activeOpacity={0.75}>
              {route.name === 'Profile' ? (
                <Text style={[styles.avatarText, { color: tintColor }]}>{getInitials(user?.name || 'Guest')}</Text>
              ) : (
                <Ionicons name={isFocused ? (ICONS[route.name] || ICONS.Home).on : (ICONS[route.name] || ICONS.Home).off} size={22} color={tintColor} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingTop: 10 },
  pill: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 999,
    padding: PILL_PADDING,
    ...Platform.select({
      ios: { shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 18 },
      android: { elevation: 8 },
      default: { shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.18, shadowRadius: 18 },
    }),
  },
  tab: { width: TAB_SIZE, height: TAB_SIZE, alignItems: 'center', justifyContent: 'center' },
  blob: {
    position: 'absolute',
    top: PILL_PADDING,
    width: BLOB_SIZE,
    height: BLOB_SIZE,
    borderRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  blobTransition: Platform.select({
    web: { transitionProperty: 'left', transitionDuration: '320ms', transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    default: {},
  }),
  avatarText: { fontSize: 12, fontWeight: '700' },
});

export default TechnicalTabBar;
