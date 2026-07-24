import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearch } from '../../hooks';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });
const RECENT = ['Klempner Notfall', 'Wohnungsreinigung', 'Elektriker Essen'];

const SearchScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const [query, setQuery] = useState('');
  const { results, loading, search, clear } = useSearch();

  const POPULAR = [
    { id: '1', name: t('home.plumber'),     icon: 'water-outline',       code: '01/PLB' },
    { id: '2', name: t('home.electrician'), icon: 'flash-outline',      code: '02/ELC' },
    { id: '3', name: t('home.cleaning'),    icon: 'sparkles-outline',   code: '03/CLN' },
    { id: '4', name: t('home.heating'),     icon: 'thermometer-outline', code: '04/HVC' },
    { id: '5', name: t('home.carpenter'),   icon: 'hammer-outline',     code: '05/CRP' },
    { id: '6', name: t('home.gardener'),    icon: 'leaf-outline',       code: '07/GRD' },
  ];

  const handleChange = (text) => { setQuery(text); search(text); };
  const handleClear = () => { setQuery(''); clear(); };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={d.text} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={d.textSoft} />
          <TextInput
            style={styles.input}
            placeholder={t('home.searchPlaceholder')}
            placeholderTextColor={d.textSoft}
            value={query}
            onChangeText={handleChange}
            autoFocus
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={handleClear}><Ionicons name="close-circle" size={18} color={d.textSoft} /></TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {query.length > 0 ? (
          <View style={styles.section}>
            {loading ? (
              <ActivityIndicator color={d.line} style={{ marginTop: 24 }} />
            ) : (
              <>
                <Text style={styles.sectionTitle}>{results.length} {t('search.resultsFor')} "{query}"</Text>
                {results.length === 0 ? (
                  <Text style={styles.noResults}>{t('search.noResults')}</Text>
                ) : (
                  results.map((item) => (
                    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ProviderDetail', { provider: item })}>
                      <View style={styles.resultCard}>
                        <View style={styles.resultRow}>
                          <View style={styles.resultAvatar}><Ionicons name="business-outline" size={18} color={d.line} /></View>
                          <View style={styles.resultInfo}>
                            <Text style={styles.resultName}>{item.name}</Text>
                            <Text style={styles.resultCategory}>{item.category} · {item.distance}</Text>
                          </View>
                          <View style={styles.ratingChip}><Ionicons name="star" size={11} color={d.amber} /><Text style={styles.ratingText}>{item.rating}</Text></View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </>
            )}
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('search.recentSearches')}</Text>
              {RECENT.map((r, i) => (
                <TouchableOpacity key={i} style={styles.recentItem} onPress={() => handleChange(r)}>
                  <Ionicons name="time-outline" size={15} color={d.textSoft} />
                  <Text style={styles.recentText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('search.popularCategories')}</Text>
              <View style={styles.popularGrid}>
                {POPULAR.map((cat) => (
                  <TouchableOpacity key={cat.id} style={styles.popularCard} onPress={() => navigation.navigate('ProviderList', { service: cat.name })}>
                    <Ionicons name={cat.icon} size={20} color={d.line} />
                    <Text style={styles.popularCode}>{cat.code}</Text>
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

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingBottom: 12, paddingHorizontal: 18, backgroundColor: d.canvas, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  backBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, paddingHorizontal: 12, gap: 8 },
  input: { flex: 1, paddingVertical: 10, fontSize: 14, color: d.text },
  content: { padding: 18 },
  section: { marginBottom: 22 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: d.text, marginBottom: 12 },
  noResults: { fontSize: 13, color: d.textSoft },
  resultCard: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 12, marginBottom: 8 },
  resultRow: { flexDirection: 'row', alignItems: 'center' },
  resultAvatar: { width: 40, height: 40, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  resultInfo: { flex: 1 },
  resultName: { fontSize: 13.5, fontWeight: '700', color: d.text },
  resultCategory: { fontSize: 11.5, color: d.textSoft, marginTop: 2 },
  ratingChip: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: d.canvas, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  ratingText: { fontSize: 11.5, fontWeight: '700', color: d.text },
  recentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  recentText: { flex: 1, fontSize: 13.5, color: d.textSoft },
  popularGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  popularCard: { width: '31%', backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4 },
  popularCode: { fontSize: 8, color: d.line, fontFamily: MONO },
  popularLabel: { fontSize: 11, fontWeight: '600', color: d.text, textAlign: 'center', marginTop: 2 },
});

export default SearchScreen;
