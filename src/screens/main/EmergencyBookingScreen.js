import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, Linking, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBookings } from '../../hooks';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';
import { locationService } from '../../services';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const TYPES = [
  { id: 'pipe', icon: 'water-outline', labelKey: 'emergency.waterLeak', hintKey: 'emergency.hintPipe' },
  { id: 'gas', icon: 'flame-outline', labelKey: 'emergency.gasLeak', hintKey: 'emergency.hintGas' },
  { id: 'power', icon: 'flash-outline', labelKey: 'emergency.powerOutage', hintKey: 'emergency.hintPower' },
  { id: 'flood', icon: 'water', labelKey: 'emergency.flooding', hintKey: 'emergency.hintFlood' },
  { id: 'lock', icon: 'lock-closed-outline', labelKey: 'emergency.lockedDoor', hintKey: 'emergency.hintLock' },
];

const SosRing = ({ color }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 1400, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(200),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });
  return <Animated.View style={[styles.sosPulse, { borderColor: color, transform: [{ scale }], opacity }]} />;
};

const EmergencyBookingScreen = ({ navigation }) => {
  const { create } = useBookings();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState('pipe');
  const address = locationService.formatAddress();
  const selectedType = TYPES.find((tp) => tp.id === selected);

  const call = (number) => Linking.openURL(`tel:${number}`).catch(() => {});

  const handleRequest = async () => {
    const now = new Date();
    await create({
      service: t(selectedType.labelKey), provider: 'Emergency Dispatch',
      date: now.toLocaleDateString(), time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pending', urgency: 'emergency', total: 130,
    });
    Alert.alert(t('emergency.reported'), t('emergency.reportedBody'), [
      { text: t('emergency.trackJob'), onPress: () => navigation.navigate('LiveTracking') },
      { text: t('emergency.ok'), onPress: () => navigation.navigate('MainTabs', { screen: 'Home' }) },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: d.canvas }]}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <TouchableOpacity style={[styles.back, { borderColor: d.lineSoft }]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={16} color={d.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headTitle, { color: d.text }]}>{t('emergency.title')}</Text>
            <Text style={[styles.headSub, { color: d.textSoft }]}>{t('emergency.avgResponse')}</Text>
          </View>
        </View>

        <View style={[styles.banner, { backgroundColor: d.dangerSoft, borderColor: d.danger }]}>
          <Text style={[styles.bannerText, { color: d.danger }]}>{t('emergency.urgentRequest').toUpperCase()}</Text>
          <Text style={[styles.bannerText, { color: d.danger }]}>24/7</Text>
        </View>

        <View style={styles.sosWrap}>
          <View style={[styles.sosRingBase, { borderColor: d.danger }]}>
            <SosRing color={d.danger} />
            <View style={[styles.sosCore, { backgroundColor: d.dangerSoft, borderColor: d.danger }]}>
              <Text style={[styles.sosBang, { color: d.danger }]}>!</Text>
              <Text style={[styles.sosLbl, { color: d.danger }]}>SOS</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.hint, { color: d.textSoft }]}>{t('emergency.tapHint')}</Text>

        <View style={styles.chipRow}>
          {TYPES.map((tp) => {
            const sel = selected === tp.id;
            return (
              <TouchableOpacity
                key={tp.id}
                style={[styles.chip, { borderColor: sel ? d.danger : d.lineSoft, backgroundColor: sel ? d.dangerSoft : d.panel }]}
                onPress={() => setSelected(tp.id)}
              >
                <Ionicons name={tp.icon} size={13} color={sel ? d.danger : d.line} />
                <Text style={[styles.chipText, { color: sel ? d.danger : d.text }]}>{t(tp.labelKey)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {selectedType ? (
          <View style={[styles.hintBox, { borderColor: d.lineSoft, backgroundColor: d.panel }]}>
            <Ionicons name="information-circle-outline" size={16} color={d.line} />
            <Text style={[styles.hintBoxText, { color: d.textSoft }]}>{t(selectedType.hintKey)}</Text>
          </View>
        ) : null}

        <View style={[styles.addressRow, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          <Ionicons name="location-outline" size={16} color={d.line} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.addrLabel, { color: d.textSoft }]}>{t('emergency.yourLocation').toUpperCase()}</Text>
            <Text style={[styles.addrValue, { color: d.text }]}>{address}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.reqBtn, { backgroundColor: d.danger }]} onPress={handleRequest} activeOpacity={0.85}>
          <Text style={styles.reqBtnText}>{t('emergency.reportButton')}</Text>
          <Text style={styles.reqBtnSub}>{t('emergency.notifiesNearby')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.callBtn, { borderColor: d.lineSoft }]} onPress={() => call('080012345')}>
          <Ionicons name="call-outline" size={14} color={d.line} />
          <Text style={[styles.callBtnText, { color: d.text }]}>{t('emergency.callDirect')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.safety, { borderColor: d.lineSoft }]} onPress={() => call('112')}>
          <Ionicons name="warning-outline" size={16} color={d.danger} />
          <Text style={[styles.safetyText, { color: d.textSoft }]}>
            <Text style={{ color: d.text, fontWeight: '700' }}>{t('emergency.lifeThreatBold')} </Text>
            {t('emergency.lifeThreat')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 18, paddingBottom: 32, paddingTop: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  back: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headTitle: { fontSize: 16, fontWeight: '700' },
  headSub: { fontSize: 10, fontFamily: MONO, marginTop: 1 },

  banner: { flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 18 },
  bannerText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, fontFamily: MONO },

  sosWrap: { alignItems: 'center', marginBottom: 12 },
  sosRingBase: { width: 118, height: 118, borderRadius: 59, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  sosPulse: { position: 'absolute', width: 118, height: 118, borderRadius: 59, borderWidth: 1.5 },
  sosCore: { width: 82, height: 82, borderRadius: 41, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  sosBang: { fontSize: 26, fontWeight: '700', lineHeight: 28 },
  sosLbl: { fontSize: 10, letterSpacing: 0.6, fontFamily: MONO, marginTop: 2 },

  hint: { textAlign: 'center', fontSize: 12, marginBottom: 18 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7 },
  chipText: { fontSize: 12, fontWeight: '500' },

  hintBox: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 18 },
  hintBoxText: { flex: 1, fontSize: 12, lineHeight: 18 },

  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 18 },
  addrLabel: { fontSize: 9, letterSpacing: 0.4, fontFamily: MONO },
  addrValue: { fontSize: 13, fontWeight: '500', marginTop: 2 },

  reqBtn: { borderRadius: 12, padding: 15, alignItems: 'center', marginBottom: 10 },
  reqBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  reqBtnSub: { color: 'rgba(255,255,255,0.85)', fontSize: 11, marginTop: 2 },

  callBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 18 },
  callBtnText: { fontSize: 13, fontWeight: '600' },

  safety: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, borderWidth: 1, borderStyle: 'dashed', borderRadius: 10, padding: 12 },
  safetyText: { flex: 1, fontSize: 11, lineHeight: 17 },
});

export default EmergencyBookingScreen;
