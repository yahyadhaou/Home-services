import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, EmptyState } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const ALL_PROVIDERS = [
  { id: '1', name: 'Müller GmbH',       rating: 4.9, reviews: 234, category: 'Klempner',  distance: '1.2 km', price: '€€'  },
  { id: '2', name: 'Schmidt Sanitär',   rating: 4.7, reviews: 189, category: 'Klempner',  distance: '2.5 km', price: '€€€' },
  { id: '3', name: 'Bauer Haustechnik', rating: 4.8, reviews: 156, category: 'Heizung',   distance: '3.1 km', price: '€€'  },
  { id: '4', name: 'Clean Pro',         rating: 4.9, reviews: 312, category: 'Reinigung', distance: '0.8 km', price: '€€'  },
];

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const favProviders = ALL_PROVIDERS.filter((p) => favorites.includes(p.id));

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProviderDetail', { provider: item })} activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.avatar}><Ionicons name="business-outline" size={22} color={d.line} /></View>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="star" size={12} color={d.amber} /><Text style={styles.rating}>{item.rating}</Text><Text style={styles.reviews}>({item.reviews})</Text>
              <View style={styles.dot} /><Text style={styles.distance}>{item.distance}</Text>
              <View style={styles.dot} /><Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.heartBtn}><Ionicons name="heart" size={19} color={d.danger} /></TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={t('favorites.title')} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={favProviders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title={t('favorites.empty')}
            subtitle={t('favorites.emptySubtitle')}
            actionLabel={t('favorites.discoverButton')}
            onAction={() => navigation.navigate('MainTabs', { screen: 'Home' })}
          />
        }
      />
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  list: { padding: 18 },
  card: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 13, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 13.5, fontWeight: '700', color: d.text },
  category: { fontSize: 12, color: d.line, fontWeight: '600', marginTop: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, flexWrap: 'wrap' },
  rating: { fontSize: 12, fontWeight: '600', color: d.text },
  reviews: { fontSize: 12, color: d.textSoft },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: d.textSoft },
  distance: { fontSize: 12, color: d.textSoft },
  price: { fontSize: 12, fontWeight: '600', color: d.textSoft },
  heartBtn: { padding: 4 },
});

export default FavoritesScreen;
