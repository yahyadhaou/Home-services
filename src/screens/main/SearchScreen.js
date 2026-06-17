import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common';
import { useSearch } from '../../hooks';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const RECENT = ['Klempner Notfall', 'Wohnungsreinigung', 'Elektriker Essen'];
const POPULAR = [
  { id: '1', name: 'Klempner',   icon: 'water',         color: colors.services.plumbing   },
  { id: '2', name: 'Elektriker', icon: 'flash',         color: colors.services.electrical },
  { id: '3', name: 'Reinigung',  icon: 'sparkles',      color: colors.services.cleaning   },
  { id: '4', name: 'Heizung',    icon: 'thermometer',   color: colors.services.hvac       },
  { id: '5', name: 'Schreiner',  icon: 'hammer',        color: colors.services.carpentry  },
  { id: '6', name: 'Gärtner',    icon: 'leaf',          color: colors.services.gardening  },
];

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const { results, loading, search, clear } = useSearch();

  const handleChange = (text) => {
    setQuery(text);
    search(text);
  };

  const handleClear = () => {
    setQuery('');
    clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.gray[900]} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray[400]} />
          <TextInput
            style={styles.input}
            placeholder="Suche nach Dienstleistungen..."
            placeholderTextColor={colors.gray[400]}
            value={query}
            onChangeText={handleChange}
            autoFocus
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={handleClear}><Ionicons name="close-circle" size={20} color={colors.gray[400]} /></TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {query.length > 0 ? (
          <View style={styles.section}>
            {loading ? (
              <ActivityIndicator color={colors.accent.main} style={{ marginTop: spacing.xl }} />
            ) : (
              <>
                <Text style={styles.sectionTitle}>{results.length} Ergebnisse für „{query}"</Text>
                {results.length === 0 ? (
                  <Text style={styles.noResults}>Keine Ergebnisse gefunden.</Text>
                ) : (
                  results.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ProviderDetail', { provider: item })}>
                      <Card style={styles.resultCard}>
                        <View style={styles.resultRow}>
                          <View style={styles.resultAvatar}><Ionicons name="business" size={22} color={colors.accent.main} /></View>
                          <View style={styles.resultInfo}>
                            <Text style={styles.resultName}>{item.name}</Text>
                            <Text style={styles.resultCategory}>{item.category}  ·  {item.distance}</Text>
                          </View>
                          <View style={styles.ratingChip}><Ionicons name="star" size={12} color={colors.accent.main} /><Text style={styles.ratingText}>{item.rating}</Text></View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  ))
                )}
              </>
            )}
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Zuletzt gesucht</Text>
              {RECENT.map((r, i) => (
                <TouchableOpacity key={i} style={styles.recentItem} onPress={() => handleChange(r)}>
                  <Ionicons name="time-outline" size={18} color={colors.gray[400]} />
                  <Text style={styles.recentText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Beliebte Kategorien</Text>
              <View style={styles.popularGrid}>
                {POPULAR.map((cat) => (
                  <TouchableOpacity key={cat.id} style={styles.popularCard} onPress={() => navigation.navigate('ProviderList', { service: cat.name })}>
                    <View style={[styles.popularIcon, { backgroundColor: cat.color }]}><Ionicons name={cat.icon} size={22} color={colors.white} /></View>
                    <Text style={styles.popularLabel}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: spacing.md, paddingHorizontal: spacing.xl, backgroundColor: colors.white, gap: spacing.sm },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.gray[100], borderRadius: borderRadius.md, paddingHorizontal: spacing.md, gap: spacing.sm },
  input: { flex: 1, paddingVertical: spacing.sm, fontSize: typography.fontSize.base, color: colors.gray[900] },
  content: { padding: spacing.xl },
  section: { marginBottom: spacing.xl },
  sectionTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.primary.main, marginBottom: spacing.md },
  noResults: { fontSize: typography.fontSize.base, color: colors.gray[500] },
  resultCard: { marginBottom: spacing.sm },
  resultRow: { flexDirection: 'row', alignItems: 'center' },
  resultAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  resultInfo: { flex: 1 },
  resultName: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  resultCategory: { fontSize: typography.fontSize.sm, color: colors.gray[500], marginTop: 2 },
  ratingChip: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.accent.main + '1A', borderRadius: 12, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  ratingText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: colors.accent.dark },
  recentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, gap: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.gray[100] },
  recentText: { flex: 1, fontSize: typography.fontSize.base, color: colors.gray[700] },
  popularGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  popularCard: { width: '30%', backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center' },
  popularIcon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  popularLabel: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[800], textAlign: 'center' },
});

export default SearchScreen;
