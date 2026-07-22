import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, Linking, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });
const CURRENT_STEP = 1; // 0-indexed into STEPS — mock "en route" state
const PROGRESS = 0.62;

const STEPS = [
  { key: 'matched', icon: 'checkmark-circle-outline' },
  { key: 'enroute', icon: 'navigate-outline' },
  { key: 'arriving', icon: 'location-outline' },
  { key: 'inprogress', icon: 'construct-outline' },
  { key: 'completed', icon: 'flag-outline' },
];

const LiveTrackingScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const provider = route?.params?.provider || { name: 'Müller GmbH' };

  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(progress, { toValue: PROGRESS, duration: 1200, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [progress]);
  const widthPct = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const leftPct = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '96%'] });

  const call = () => Linking.openURL('tel:080012345').catch(() => {});
  const cancelJob = () => {
    Alert.alert(t('liveTracking.cancelTitle'), t('liveTracking.cancelBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('liveTracking.cancelConfirm'), style: 'destructive', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: d.canvas }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <TouchableOpacity style={[styles.back, { borderColor: d.lineSoft }]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={16} color={d.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headTitle, { color: d.text }]}>{t('liveTracking.title')}</Text>
            <Text style={[styles.headSub, { color: d.line, fontFamily: MONO }]}>JOB-2291</Text>
          </View>
        </View>

        <View style={[styles.etaCard, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          <Text style={[styles.etaLbl, { color: d.textSoft }]}>{t('liveTracking.etaLabel').toUpperCase()}</Text>
          <Text style={[styles.etaBig, { color: d.amber }]}>8 MIN</Text>

          <View style={styles.routeRow}>
            <Ionicons name="business-outline" size={14} color={d.line} />
            <View style={[styles.track, { backgroundColor: d.lineSoft }]}>
              <Animated.View style={[styles.trackFill, { width: widthPct, backgroundColor: d.line }]} />
              <Animated.View style={[styles.marker, { left: leftPct, backgroundColor: d.amber }]} />
            </View>
            <Ionicons name="home-outline" size={14} color={d.line} />
          </View>
        </View>

        <View style={[styles.providerCard, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          <View style={[styles.avatar, { borderColor: d.lineSoft }]}>
            <Text style={[styles.avatarText, { color: d.line }]}>{provider.name?.[0] || 'M'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.provName, { color: d.text }]}>{provider.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={d.amber} />
              <Text style={[styles.ratingText, { color: d.textSoft }]}>4.9 · {t('liveTracking.plumber')}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.roundBtn, { borderColor: d.lineSoft }]} onPress={call}>
            <Ionicons name="call-outline" size={16} color={d.line} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.roundBtn, { borderColor: d.lineSoft }]} onPress={() => navigation.navigate('MainTabs', { screen: 'Chat', params: { provider } })}>
            <Ionicons name="chatbubble-outline" size={16} color={d.line} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { color: d.text }]}>{t('liveTracking.status')}</Text>
        <View style={[styles.timeline, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          {STEPS.map((s, i) => {
            const done = i < CURRENT_STEP;
            const active = i === CURRENT_STEP;
            const color = done ? d.green : active ? d.amber : d.textSoft;
            return (
              <View key={s.key} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <Ionicons name={s.icon} size={16} color={color} />
                  {i < STEPS.length - 1 ? <View style={[styles.stepLine, { backgroundColor: done ? d.green : d.lineSoft }]} /> : null}
                </View>
                <Text style={[styles.stepLabel, { color: active ? d.text : d.textSoft, fontWeight: active ? '700' : '400' }]}>
                  {t(`liveTracking.step_${s.key}`)}
                </Text>
                {active ? <Text style={[styles.stepNow, { color: d.amber }]}>{t('liveTracking.now').toUpperCase()}</Text> : null}
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={[styles.cancelBtn, { borderColor: d.danger }]} onPress={cancelJob}>
          <Text style={[styles.cancelText, { color: d.danger }]}>{t('liveTracking.cancelJob')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 18, paddingBottom: 32, paddingTop: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  back: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headTitle: { fontSize: 16, fontWeight: '700' },
  headSub: { fontSize: 10, marginTop: 1 },

  etaCard: { borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 14, alignItems: 'center' },
  etaLbl: { fontSize: 9, letterSpacing: 0.5, fontFamily: MONO },
  etaBig: { fontSize: 30, fontWeight: '700', fontFamily: MONO, marginTop: 2, marginBottom: 14 },
  routeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%' },
  track: { flex: 1, height: 4, borderRadius: 2, position: 'relative' },
  trackFill: { height: 4, borderRadius: 2 },
  marker: { position: 'absolute', top: -4, width: 12, height: 12, borderRadius: 6 },

  providerCard: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 18 },
  avatar: { width: 40, height: 40, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '700' },
  provName: { fontSize: 13, fontWeight: '600' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  ratingText: { fontSize: 11 },
  roundBtn: { width: 34, height: 34, borderRadius: 9, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },

  sectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 10 },
  timeline: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 18 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 30 },
  stepLeft: { alignItems: 'center' },
  stepLine: { width: 1, height: 22, marginTop: 2 },
  stepLabel: { fontSize: 12, flex: 1 },
  stepNow: { fontSize: 9, fontWeight: '700', letterSpacing: 0.4, fontFamily: MONO },

  cancelBtn: { borderWidth: 1, borderRadius: 12, padding: 13, alignItems: 'center' },
  cancelText: { fontSize: 13, fontWeight: '600' },
});

export default LiveTrackingScreen;
