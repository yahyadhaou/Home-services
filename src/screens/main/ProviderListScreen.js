import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Header, Badge } from '../../components/common';
import { useProviders } from '../../hooks';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const SORT_OPTIONS = [
  { key: 'distance', label: 'Entfernung', icon: 'location' },
  { key: 'rating',   label: 'Bewertung',  icon: 'star'     },
  { key: 'price',    label: 'Preis',      icon: 'cash'     },
];

const ProviderListScreen = ({ navigation, route }) => {
  const serviceName = route.params?.service || 'Klempner';
  const [sortBy, setSortBy] = useState('distance');
  const { providers, loading } = useProviders(); // unfiltered demo list (sub-service names don't map 1:1 to category)

  const sorted = [...providers].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price')  return a.price.length - b.price.length;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  const renderProvider = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProviderDetail', { provider: item })} activeOpacity={0.7}>
      <Card style={styles.providerCard}>
        <View style={styles.topRow}>
          <View style={styles.avatar}><Ionicons name="business" size={28} color={colors.accent.main} /></View>
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{item.name}</Text>
              {item.verified ? <Ionicons name="checkmark-circle" size={18} color={colors.status.success} style={{ marginLeft: 4 }} /> : null}
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={14} color={colors.accent.main} />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.reviews}>({item.reviews})</Text>
              <View style={styles.dot} />
              <Ionicons name="location-outline" size={13} color={colors.gray[500]} />
              <Text style={styles.distance}>{item.distance}</Text>
            </View>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}><Ionicons name="time-outline" size={15} color={colors.gray[500]} /><Text style={styles.statText}>{item.responseTime}</Text></View>
          <View style={styles.stat}><Ionicons name="checkmark-done-outline" size={15} color={colors.gray[500]} /><Text style={styles.statText}>{item.jobs} Aufträge</Text></View>
        </View>

        <Badge label={item.available} color={colors.status.success} />
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={serviceName} onBackPress={() => navigation.goBack()} rightComponent={
        <TouchableOpacity style={styles.filterBtn}><Ionicons name="options-outline" size={22} color={colors.gray[900]} /></TouchableOpacity>
      } />

      <View style={styles.sortBar}>
        {SORT_OPTIONS.map((opt) => (
          <TouchableOpacity key={opt.key} style={[styles.sortChip, sortBy === opt.key && styles.sortChipActive]} onPress={() => setSortBy(opt.key)}>
            <Ionicons name={opt.icon} size={14} color={sortBy === opt.key ? colors.white : colors.gray[600]} />
            <Text style={[styles.sortText, sortBy === opt.key && styles.sortTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.resultCount}>{sorted.length} Ergebnisse</Text>
      </View>

      {loading ? (
        <View style={styles.loadingBox}><ActivityIndicator color={colors.accent.main} size="large" /></View>
      ) : (
        <FlatList data={sorted} renderItem={renderProvider} keyExtractor={(item) => item.id} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  filterBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center' },
  sortBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, backgroundColor: colors.white, gap: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.gray[200] },
  sortChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: 6, borderRadius: borderRadius.full, backgroundColor: colors.gray[100], gap: 4 },
  sortChipActive: { backgroundColor: colors.accent.main },
  sortText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[600] },
  sortTextActive: { color: colors.white },
  resultCount: { marginLeft: 'auto', fontSize: typography.fontSize.sm, color: colors.gray[500] },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { padding: spacing.xl },
  providerCard: { marginBottom: spacing.md },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  reviews: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.gray[400] },
  distance: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  price: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[700] },
  statsRow: { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.sm },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { fontSize: typography.fontSize.xs, color: colors.gray[600] },
});

export default ProviderListScreen;
