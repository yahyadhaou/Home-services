import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Header, EmptyState } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { colors, typography, spacing } from '../../constants/theme';

const ALL_PROVIDERS = [
  { id: '1', name: 'Müller GmbH',       rating: 4.9, reviews: 234, category: 'Klempner',  distance: '1.2 km', price: '€€'  },
  { id: '2', name: 'Schmidt Sanitär',   rating: 4.7, reviews: 189, category: 'Klempner',  distance: '2.5 km', price: '€€€' },
  { id: '3', name: 'Bauer Haustechnik', rating: 4.8, reviews: 156, category: 'Heizung',   distance: '3.1 km', price: '€€'  },
  { id: '4', name: 'Clean Pro',         rating: 4.9, reviews: 312, category: 'Reinigung', distance: '0.8 km', price: '€€'  },
];

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useApp();
  const favProviders = ALL_PROVIDERS.filter((p) => favorites.includes(p.id));

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProviderDetail', { provider: item })} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.avatar}><Ionicons name="business" size={26} color={colors.accent.main} /></View>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <View style={styles.metaRow}>
              <Ionicons name="star" size={13} color={colors.accent.main} /><Text style={styles.rating}>{item.rating}</Text><Text style={styles.reviews}>({item.reviews})</Text>
              <View style={styles.dot} /><Text style={styles.distance}>{item.distance}</Text>
              <View style={styles.dot} /><Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => removeFavorite(item.id)} style={styles.heartBtn}><Ionicons name="heart" size={22} color="#F87171" /></TouchableOpacity>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Favoriten" onBackPress={() => navigation.goBack()} />
      <FlatList
        data={favProviders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="heart-outline"
            title="Keine Favoriten"
            subtitle="Tippen Sie auf das Herz-Symbol bei einem Dienstleister, um ihn hier zu speichern."
            actionLabel="Dienstleister entdecken"
            onAction={() => navigation.navigate('Home')}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  list: { padding: spacing.xl },
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  info: { flex: 1 },
  name: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  category: { fontSize: typography.fontSize.sm, color: colors.accent.main, fontWeight: typography.fontWeight.medium, marginTop: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, flexWrap: 'wrap' },
  rating: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[800] },
  reviews: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  dot: { width: 3, height: 3, borderRadius: 2, backgroundColor: colors.gray[400] },
  distance: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  price: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[600] },
  heartBtn: { padding: spacing.xs },
});

export default FavoritesScreen;
