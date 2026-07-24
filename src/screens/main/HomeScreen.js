import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const PRO_DOTS = [
  { top: '22%', left: '32%', delay: 0 },
  { top: '64%', left: '70%', delay: 700 },
  { top: '70%', left: '22%', delay: 1400 },
];

const RadarPulseDot = ({ delay, color }) => {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 1600, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.delay(200),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, delay]);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] });

  return (
    <View style={styles.proDotWrap}>
      <Animated.View style={[styles.proDotRing, { backgroundColor: color, transform: [{ scale }], opacity }]} />
      <View style={[styles.proDotCore, { backgroundColor: color }]} />
    </View>
  );
};

const RadarSweep = ({ color }) => {
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 3400, easing: Easing.linear, useNativeDriver: true }));
    loop.start();
    return () => loop.stop();
  }, [spin]);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  return <Animated.View style={[styles.sweepRing, { borderTopColor: color, transform: [{ rotate }] }]} />;
};

const HomeScreen = ({ navigation }) => {
  const { user, bookings } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles2 = createStyles(d);

  const SERVICES = [
    { code: '01/PLB', icon: 'water-outline', name: t('home.plumber'), available: 12, category: t('home.plumber') },
    { code: '02/ELC', icon: 'flash-outline', name: t('home.electrician'), available: 8, category: t('home.electrician') },
    { code: '03/CLN', icon: 'sparkles-outline', name: t('home.cleaning'), available: 15, category: t('home.cleaning') },
    { code: '04/HVC', icon: 'thermometer-outline', name: t('home.heating'), available: 6, category: t('home.heating') },
    { code: '05/CRP', icon: 'hammer-outline', name: t('home.carpenter'), available: 10, category: t('home.carpenter') },
    { code: '06/PNT', icon: 'color-palette-outline', name: t('home.painter'), available: 14, category: t('home.painter') },
    { code: '07/GRD', icon: 'leaf-outline', name: t('home.gardener'), available: 9, category: t('home.gardener') },
    { code: '08/NET', icon: 'wifi-outline', name: t('home.internet'), available: 7, category: t('home.internet') },
    { code: '09/HDW', icon: 'construct-outline', name: t('home.handyman'), available: 11, category: t('home.handyman') },
  ];

  const MOCK_BOOKINGS = [
    { id: 'm1', service: t('home.plumber'), provider: 'Rüttenscheider Sanitärtechnik GmbH', date: '15.05.2026', time: '14:00', status: 'confirmed' },
  ];
  const displayBookings = bookings.length > 0 ? bookings : MOCK_BOOKINGS;
  const recent = displayBookings[0];

  const bookAgain = (job) => navigation.navigate('Booking', { provider: { name: job.provider }, service: job.service });

  return (
    <View style={[styles2.container, { backgroundColor: d.canvas }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles2.scroll, { paddingTop: insets.top + 12 }]}>
        <View style={styles2.top}>
          <View>
            <Text style={[styles2.greet, { color: d.textSoft }]}>{t('home.greeting').toUpperCase()}</Text>
            <Text style={[styles2.name, { color: d.text }]}>{user?.name || t('home.welcome')}</Text>
          </View>
          <View style={styles2.icrow}>
            <TouchableOpacity style={[styles2.icbtn, { borderColor: d.lineSoft }]} onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={15} color={d.line} />
              <View style={[styles2.dotLive, { backgroundColor: d.amber, borderColor: d.canvas }]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles2.icbtn, { borderColor: d.lineSoft }]} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person-outline" size={15} color={d.line} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={[styles2.search, { backgroundColor: d.panel, borderColor: d.lineSoft }]} activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={14} color={d.textSoft} />
          <Text style={[styles2.searchText, { color: d.textSoft }]}>{t('home.searchPlaceholder')}</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('Search')} style={[styles2.radarWrap, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          <View style={styles2.radarTagRow}>
            <View style={styles2.radarTag}>
              <View style={[styles2.blinkDot, { backgroundColor: d.amber }]} />
              <Text style={[styles2.radarTagText, { color: d.line }]}>{t('home.liveDispatch').toUpperCase()}</Text>
            </View>
            <TouchableOpacity style={[styles2.sosBtn, { borderColor: d.danger, backgroundColor: d.dangerSoft }]} onPress={() => navigation.navigate('EmergencyBooking')}>
              <Text style={[styles2.sosText, { color: d.danger }]}>SOS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles2.radarField}>
            <RadarSweep color={d.lineSoft} />
            <View style={[styles2.center, { borderColor: d.amber }]} />
            <Text style={[styles2.youLabel, { color: d.amber }]}>{t('home.you').toUpperCase()} · RÜTTENSCHEID</Text>
            {PRO_DOTS.map((p, i) => (
              <View key={i} style={[styles2.proDotAbs, { top: p.top, left: p.left }]}>
                <RadarPulseDot delay={p.delay} color={d.line} />
              </View>
            ))}
          </View>

          <View style={[styles2.radarStats, { borderTopColor: d.lineSoft }]}>
            <View>
              <Text style={[styles2.statBig, { color: d.amber }]}>24</Text>
              <Text style={[styles2.statLbl, { color: d.textSoft }]}>{t('home.prosNearby').toUpperCase()}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles2.statBig, { color: d.amber }]}>8 MIN</Text>
              <Text style={[styles2.statLbl, { color: d.textSoft }]}>{t('home.fastestMatch').toUpperCase()}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles2.sech}>
          <Text style={[styles2.sechH, { color: d.text }]}>{t('home.services')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ServiceCategory', { service: t('home.plumber') })}>
            <Text style={[styles2.sechSee, { color: d.line }]}>{t('home.seeAll').toUpperCase()} &gt;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles2.tiles}>
          {SERVICES.map((s) => (
            <TouchableOpacity
              key={s.code}
              style={[styles2.tile, { borderColor: d.lineSoft, backgroundColor: d.panel }]}
              onPress={() => navigation.navigate('ServiceCategory', { service: s.category })}
              activeOpacity={0.75}
            >
              <Text style={[styles2.tileCode, { color: d.line }]}>{s.code}</Text>
              <Ionicons name={s.icon} size={36} color={d.line} style={styles2.tileIcon} />
              <Text style={[styles2.tileName, { color: d.text }]} numberOfLines={1}>{s.name}</Text>
              <Text style={[styles2.tileAvail, { color: d.amber }]}>{s.available} {t('home.available')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {recent ? (
          <>
            <View style={styles2.sech}>
              <Text style={[styles2.sechH, { color: d.text }]}>{t('home.recentJob')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MyBookings')}>
                <Text style={[styles2.sechSee, { color: d.line }]}>{t('home.history').toUpperCase()} &gt;</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles2.ticket, { backgroundColor: d.panel, borderColor: d.lineSoft }]} onPress={() => navigation.navigate('BookingDetail', { booking: recent })} activeOpacity={0.85}>
              <View style={{ flex: 1 }}>
                <Text style={[styles2.jobNo, { color: d.line }]}>JOB-{String(recent.id).toUpperCase().slice(-4).padStart(4, '2')}</Text>
                <Text style={[styles2.jobTitle, { color: d.text }]}>{recent.service}</Text>
                <Text style={[styles2.jobSub, { color: d.textSoft }]}>{recent.provider} · {recent.date}, {recent.time}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                <View style={[styles2.stamp, { borderColor: d.green }]}>
                  <Text style={[styles2.stampText, { color: d.green }]}>{t('home.statusConfirmed').toUpperCase()}</Text>
                </View>
                <TouchableOpacity onPress={() => bookAgain(recent)}>
                  <Text style={[styles2.bookAgain, { color: d.line }]}>{t('home.bookAgain')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const createStyles = () => StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 18, paddingBottom: 24 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  greet: { fontSize: 11, letterSpacing: 0.6, fontFamily: MONO },
  name: { fontSize: 20, fontWeight: '700', letterSpacing: -0.2, marginTop: 2 },
  icrow: { flexDirection: 'row', gap: 8 },
  icbtn: { width: 32, height: 32, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  dotLive: { position: 'absolute', top: -3, right: -3, width: 8, height: 8, borderRadius: 4, borderWidth: 2 },

  search: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 10, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16 },
  searchText: { fontSize: 13, fontFamily: MONO },

  radarWrap: { borderRadius: 16, borderWidth: 1, overflow: 'hidden', marginBottom: 20 },
  radarTagRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingTop: 10 },
  radarTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  blinkDot: { width: 6, height: 6, borderRadius: 3 },
  radarTagText: { fontSize: 10, letterSpacing: 1, fontFamily: MONO },
  sosBtn: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  sosText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, fontFamily: MONO },

  radarField: { height: 118, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  center: { width: 10, height: 10, borderRadius: 5, borderWidth: 1.5 },
  youLabel: { position: 'absolute', top: '54%', fontSize: 8, letterSpacing: 0.4, fontFamily: MONO },
  proDotAbs: { position: 'absolute' },

  radarStats: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderTopWidth: 1 },
  statBig: { fontSize: 17, fontWeight: '700', fontFamily: MONO },
  statLbl: { fontSize: 9, letterSpacing: 0.4, marginTop: 2, fontFamily: MONO },

  sech: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 },
  sechH: { fontSize: 15, fontWeight: '700' },
  sechSee: { fontSize: 10, letterSpacing: 0.4, fontFamily: MONO },

  tiles: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  tile: { width: '31%', aspectRatio: 1, borderRadius: 16, borderWidth: 1, padding: 8, alignItems: 'center', justifyContent: 'center' },
  tileIcon: { marginVertical: 8 },
  tileCode: { position: 'absolute', top: 9, left: 9, fontSize: 8.5, letterSpacing: 0.3, fontFamily: MONO },
  tileName: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  tileAvail: { fontSize: 10, fontFamily: MONO, marginTop: 3, textAlign: 'center' },

  ticket: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, padding: 14, gap: 10 },
  jobNo: { fontSize: 10, letterSpacing: 0.4, fontFamily: MONO, marginBottom: 3 },
  jobTitle: { fontSize: 14, fontWeight: '600' },
  jobSub: { fontSize: 11, marginTop: 2 },
  stamp: { borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 6, paddingVertical: 3, transform: [{ rotate: '-6deg' }] },
  stampText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3, fontFamily: MONO },
  bookAgain: { fontSize: 11, fontWeight: '600', fontFamily: MONO },
});

const styles = StyleSheet.create({
  proDotWrap: { width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  proDotRing: { position: 'absolute', width: 7, height: 7, borderRadius: 3.5 },
  proDotCore: { width: 7, height: 7, borderRadius: 3.5 },
  sweepRing: { position: 'absolute', width: 108, height: 108, borderRadius: 54, borderWidth: 2, borderColor: 'transparent' },
});

export default HomeScreen;
