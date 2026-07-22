import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });
const SERVICE_ICONS = { Klempner: 'water-outline', Elektriker: 'flash-outline', Reinigung: 'sparkles-outline', Maler: 'color-palette-outline', Schreiner: 'hammer-outline', Gärtner: 'leaf-outline', Umzug: 'car-outline', Handwerker: 'construct-outline' };

const MOCK = [
  { id: 'm1', service: 'Klempner',   provider: 'Müller GmbH',     date: '15.05.2025', time: '14:00', status: 'upcoming'  },
  { id: 'm2', service: 'Reinigung',  provider: 'Clean Pro',       date: '10.05.2025', time: '10:00', status: 'completed', frequency: 'weekly' },
  { id: 'm3', service: 'Elektriker', provider: 'Schmidt Elektro', date: '05.05.2025', time: '16:00', status: 'completed' },
  { id: 'm4', service: 'Maler',      provider: 'Farbwerk GmbH',   date: '20.05.2025', time: '09:00', status: 'pending'   },
];

const MyBookingsScreen = ({ navigation }) => {
  const { bookings } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('all');

  const STATUS = {
    upcoming:  { label: t('myBookings.statusUpcoming'),  color: d.line },
    confirmed: { label: t('myBookings.statusConfirmed'), color: d.line },
    completed: { label: t('myBookings.statusCompleted'), color: d.green },
    pending:   { label: t('myBookings.statusPending'),   color: d.amber },
    cancelled: { label: t('myBookings.statusCancelled'), color: d.danger },
  };
  const FILTERS = [
    { key: 'all', label: t('myBookings.filterAll') },
    { key: 'upcoming', label: t('myBookings.filterUpcoming') },
    { key: 'completed', label: t('myBookings.filterCompleted') },
  ];

  const allBookings = bookings.length > 0 ? bookings : MOCK;
  const filtered = filter === 'all' ? allBookings : allBookings.filter((b) => b.status === filter);

  const bookAgain = (job) => navigation.navigate('Booking', { provider: { name: job.provider }, service: job.service });

  const renderItem = ({ item }) => {
    const st = STATUS[item.status] || STATUS.pending;
    const jobNo = `JOB-${String(item.id).toUpperCase().replace(/[^A-Z0-9]/g, '').padStart(4, '0').slice(-4)}`;
    const recurring = item.frequency && item.frequency !== 'once';
    return (
      <TouchableOpacity onPress={() => navigation.navigate('BookingDetail', { booking: item })} activeOpacity={0.85}>
        <View style={[styles.ticket, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          <View style={[styles.iconWrap, { borderColor: d.lineSoft }]}>
            <Ionicons name={SERVICE_ICONS[item.service] || 'construct-outline'} size={18} color={d.line} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.jobNoRow}>
              <Text style={[styles.jobNo, { color: d.line }]}>{jobNo}</Text>
              {recurring ? (
                <View style={[styles.recurBadge, { borderColor: d.amber }]}>
                  <Ionicons name="repeat" size={9} color={d.amber} />
                  <Text style={[styles.recurText, { color: d.amber }]}>{t(`booking.freq${item.frequency.charAt(0).toUpperCase()}${item.frequency.slice(1)}`).toUpperCase()}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.service, { color: d.text }]}>{item.service}</Text>
            <Text style={[styles.provider, { color: d.textSoft }]}>{item.provider} · {item.date}, {item.time}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            <View style={[styles.stamp, { borderColor: st.color }]}>
              <Text style={[styles.stampText, { color: st.color }]}>{st.label.toUpperCase()}</Text>
            </View>
            {item.status === 'completed' ? (
              <TouchableOpacity onPress={() => bookAgain(item)}>
                <Text style={[styles.bookAgain, { color: d.line }]}>{t('home.bookAgain')}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: d.canvas }]}>
      <View style={[styles.head, { paddingTop: insets.top + 12 }]}>
        <Text style={[styles.headTitle, { color: d.text }]}>{t('myBookings.title')}</Text>
      </View>
      <View style={styles.filterBar}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f.key} style={[styles.filterChip, { borderColor: d.lineSoft }, filter === f.key && { backgroundColor: d.line, borderColor: d.line }]} onPress={() => setFilter(f.key)}>
            <Text style={[styles.filterText, { color: filter === f.key ? d.canvas : d.textSoft }]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState icon="calendar-outline" title={t('myBookings.empty')} subtitle={t('myBookings.emptySubtitle')} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  head: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 8 },
  headTitle: { fontSize: 18, fontWeight: '700' },
  filterBar: { flexDirection: 'row', paddingHorizontal: 18, paddingBottom: 10, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  filterText: { fontSize: 12, fontWeight: '600' },
  list: { padding: 18, paddingTop: 4 },
  ticket: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10 },
  iconWrap: { width: 40, height: 40, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  jobNoRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  jobNo: { fontSize: 10, letterSpacing: 0.4, fontFamily: MONO },
  recurBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, borderWidth: 1, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 1 },
  recurText: { fontSize: 8, fontWeight: '700', letterSpacing: 0.2, fontFamily: MONO },
  service: { fontSize: 13, fontWeight: '600' },
  provider: { fontSize: 11, marginTop: 2 },
  stamp: { borderWidth: 1.5, borderRadius: 5, paddingHorizontal: 6, paddingVertical: 3, transform: [{ rotate: '-6deg' }] },
  stampText: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3, fontFamily: MONO },
  bookAgain: { fontSize: 11, fontWeight: '600', fontFamily: MONO },
});

export default MyBookingsScreen;
