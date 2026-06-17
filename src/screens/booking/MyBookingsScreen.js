import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Header, Badge, EmptyState } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const MOCK = [
  { id: 'm1', service: 'Klempner',   provider: 'Müller GmbH',     date: '15.05.2025', time: '14:00', status: 'upcoming'  },
  { id: 'm2', service: 'Reinigung',  provider: 'Clean Pro',       date: '10.05.2025', time: '10:00', status: 'completed' },
  { id: 'm3', service: 'Elektriker', provider: 'Schmidt Elektro', date: '05.05.2025', time: '16:00', status: 'completed' },
  { id: 'm4', service: 'Maler',      provider: 'Farbwerk GmbH',   date: '20.05.2025', time: '09:00', status: 'pending'   },
];

const STATUS = {
  upcoming:  { label: 'Anstehend',     color: colors.status.info    },
  confirmed: { label: 'Bestätigt',     color: colors.status.info    },
  completed: { label: 'Abgeschlossen', color: colors.status.success },
  pending:   { label: 'Ausstehend',    color: colors.status.warning },
  cancelled: { label: 'Storniert',     color: colors.status.error   },
};

const FILTERS = [{ key: 'all', label: 'Alle' }, { key: 'upcoming', label: 'Anstehend' }, { key: 'completed', label: 'Abgeschlossen' }];

const SERVICE_ICONS = { Klempner: 'water', Elektriker: 'flash', Reinigung: 'sparkles', Maler: 'color-palette', Schreiner: 'hammer', Gärtner: 'leaf', Umzug: 'car', Handwerker: 'construct' };

const MyBookingsScreen = ({ navigation }) => {
  const { bookings } = useApp();
  const [filter, setFilter] = useState('all');
  const allBookings = bookings.length > 0 ? bookings : MOCK;
  const filtered = filter === 'all' ? allBookings : allBookings.filter((b) => b.status === filter);

  const renderItem = ({ item }) => {
    const st = STATUS[item.status] || STATUS.pending;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('BookingDetail', { booking: item })} activeOpacity={0.7}>
        <Card style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconWrap, { backgroundColor: st.color + '1A' }]}><Ionicons name={SERVICE_ICONS[item.service] || 'construct'} size={24} color={st.color} /></View>
            <View style={styles.info}>
              <Text style={styles.service}>{item.service}</Text>
              <Text style={styles.provider}>{item.provider}</Text>
              <View style={styles.datetimeRow}><Ionicons name="calendar-outline" size={13} color={colors.gray[400]} /><Text style={styles.datetime}>{item.date}  ·  {item.time}</Text></View>
            </View>
            <View>
              <Badge label={st.label} color={st.color} />
              <Ionicons name="chevron-forward" size={18} color={colors.gray[300]} style={styles.chevron} />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Meine Buchungen" onBackPress={() => navigation.goBack()} />

      <View style={styles.filterBar}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f.key} style={[styles.filterChip, filter === f.key && styles.filterChipActive]} onPress={() => setFilter(f.key)}>
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState icon="calendar-outline" title="Keine Buchungen" subtitle="Hier erscheinen Ihre kommenden und vergangenen Termine." />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  filterBar: { flexDirection: 'row', paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, backgroundColor: colors.white, gap: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.gray[200] },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: borderRadius.full, backgroundColor: colors.gray[100] },
  filterChipActive: { backgroundColor: colors.accent.main },
  filterText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[600] },
  filterTextActive: { color: colors.white },
  list: { padding: spacing.xl },
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  info: { flex: 1 },
  service: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  provider: { fontSize: typography.fontSize.sm, color: colors.gray[600], marginTop: 1 },
  datetimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  datetime: { fontSize: typography.fontSize.xs, color: colors.gray[500] },
  chevron: { marginTop: spacing.sm, alignSelf: 'flex-end' },
});

export default MyBookingsScreen;
