import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, Badge } from '../../components/common';
import { useProviders } from '../../hooks';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

// Maps the translated display name shown in the UI (e.g. "Plumber") back to the
// German category key used in the provider mock data (e.g. "Klempner") — same
// resolution pattern as ServiceCategoryScreen's SERVICE_META/resolveServiceCode.
const CATEGORY_BY_CODE = {
  plumber: 'Klempner', electrician: 'Elektriker', cleaning: 'Reinigung', heating: 'Heizung',
  carpenter: 'Schreiner', painter: 'Maler', gardener: 'Gärtner', internet: 'Internettechniker', handyman: 'Handwerker',
};
const resolveCategory = (displayName, t) => {
  const code = Object.keys(CATEGORY_BY_CODE).find((c) => t(`home.${c}`) === displayName);
  return code ? CATEGORY_BY_CODE[code] : null;
};

const ProviderListScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const serviceName = route.params?.service || t('home.plumber');
  const category = resolveCategory(serviceName, t);
  const [sortBy, setSortBy] = useState('distance');
  const [typeFilter, setTypeFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const { providers, loading } = useProviders(category);

  const SORT_OPTIONS = [
    { key: 'distance', label: t('providerList.sortDistance'), icon: 'location-outline' },
    { key: 'rating',   label: t('providerList.sortRating'),  icon: 'star-outline'     },
    { key: 'price',    label: t('providerList.sortPrice'),    icon: 'cash-outline'     },
  ];
  const TYPE_FILTERS = [
    { key: 'all', label: t('providerList.all') },
    { key: 'company', label: t('providerList.company') },
    { key: 'independent', label: t('providerList.independent') },
  ];

  const filtered = typeFilter === 'all' ? providers : providers.filter((p) => p.providerType === typeFilter);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price')  return a.hourlyRate - b.hourlyRate;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  const renderProvider = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProviderDetail', { provider: item })} activeOpacity={0.8}>
      <View style={styles.providerCard}>
        <View style={styles.topRow}>
          <View style={styles.avatar}><Ionicons name={item.providerType === 'independent' ? 'person-outline' : 'business-outline'} size={22} color={d.line} /></View>
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{item.name}</Text>
              {item.verified ? <Ionicons name="checkmark-circle" size={15} color={d.green} style={{ marginLeft: 4 }} /> : null}
            </View>
            <Text style={styles.typeTag}>{item.providerType === 'independent' ? t('providerList.independent') : t('providerList.company')} · {item.district}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={d.amber} />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.reviews}>({item.reviews})</Text>
              <View style={styles.dot} />
              <Ionicons name="location-outline" size={11} color={d.textSoft} />
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
          </View>
          <View style={styles.priceWrap}>
            <Text style={styles.price}>€{item.hourlyRate}</Text>
            <Text style={styles.priceUnit}>/ {t('providerList.perHour')}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}><Ionicons name="time-outline" size={13} color={d.textSoft} /><Text style={styles.statText}>{item.responseTime} {t('providerList.responseTime')}</Text></View>
          <View style={styles.stat}><Ionicons name="checkmark-done-outline" size={13} color={d.textSoft} /><Text style={styles.statText}>{item.jobs} {t('providerList.completedJobs')}</Text></View>
        </View>

        <Badge label={item.available} color={d.green} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={serviceName} onBackPress={() => navigation.goBack()} rightComponent={
        <TouchableOpacity style={[styles.filterBtn, filterOpen && { borderColor: d.line, backgroundColor: d.panel }]} onPress={() => setFilterOpen((o) => !o)}>
          <Ionicons name="options-outline" size={16} color={filterOpen ? d.line : d.text} />
        </TouchableOpacity>
      } />

      {filterOpen ? (
        <View style={styles.filterBar}>
          <Text style={styles.filterLabel}>{t('providerList.filterBy').toUpperCase()}</Text>
          <View style={styles.filterChipRow}>
            {TYPE_FILTERS.map((f) => (
              <TouchableOpacity key={f.key} style={[styles.filterChip, typeFilter === f.key && styles.filterChipActive]} onPress={() => setTypeFilter(f.key)}>
                <Text style={[styles.filterChipText, typeFilter === f.key && styles.filterChipTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.sortBar}>
        {SORT_OPTIONS.map((opt) => (
          <TouchableOpacity key={opt.key} style={[styles.sortChip, sortBy === opt.key && styles.sortChipActive]} onPress={() => setSortBy(opt.key)}>
            <Ionicons name={opt.icon} size={12} color={sortBy === opt.key ? d.canvas : d.textSoft} />
            <Text style={[styles.sortText, sortBy === opt.key && styles.sortTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.resultCount}>{sorted.length} {t('providerList.results')}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingBox}><ActivityIndicator color={d.line} size="large" /></View>
      ) : (
        <FlatList data={sorted} renderItem={renderProvider} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />
      )}
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  filterBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  filterBar: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 4, backgroundColor: d.canvas, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  filterLabel: { fontSize: 9.5, letterSpacing: 0.5, color: d.textSoft, fontFamily: MONO, marginBottom: 8 },
  filterChipRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  filterChip: { paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft },
  filterChipActive: { backgroundColor: d.line, borderColor: d.line },
  filterChipText: { fontSize: 12, fontWeight: '600', color: d.text },
  filterChipTextActive: { color: d.canvas },
  sortBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 10, backgroundColor: d.canvas, gap: 8, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  sortChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 11, paddingVertical: 6, borderRadius: 20, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, gap: 4 },
  sortChipActive: { backgroundColor: d.line, borderColor: d.line },
  sortText: { fontSize: 11.5, fontWeight: '600', color: d.textSoft },
  sortTextActive: { color: d.canvas },
  resultCount: { marginLeft: 'auto', fontSize: 11.5, color: d.textSoft, fontFamily: MONO },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { padding: 18 },
  providerCard: { backgroundColor: d.panel, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft, padding: 14, marginBottom: 12 },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 46, height: 46, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  name: { fontSize: 14, fontWeight: '700', color: d.text },
  typeTag: { fontSize: 10.5, color: d.line, fontWeight: '600', marginBottom: 3 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 12, fontWeight: '600', color: d.text },
  reviews: { fontSize: 12, color: d.textSoft },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: d.textSoft },
  distance: { fontSize: 12, color: d.textSoft },
  priceWrap: { alignItems: 'flex-end' },
  price: { fontSize: 17, fontWeight: '700', color: d.amber, fontFamily: MONO },
  priceUnit: { fontSize: 9.5, color: d.textSoft, fontFamily: MONO },
  statsRow: { flexDirection: 'row', gap: 16, marginBottom: 10 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: 11, color: d.textSoft },
});

export default ProviderListScreen;
