import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button, Badge } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const TABS = ['Über uns', 'Bewertungen', 'Leistungen'];
const REVIEWS = [
  { id: '1', author: 'Anna M.',  rating: 5, date: '05.05.2025', comment: 'Sehr professionell und pünktlich. Kann ich nur empfehlen!' },
  { id: '2', author: 'Klaus B.', rating: 4, date: '01.05.2025', comment: 'Gute Arbeit, schnell und sauber.' },
  { id: '3', author: 'Sara T.',  rating: 5, date: '25.04.2025', comment: 'Toller Service, sehr freundlich.' },
];

const ProviderDetailScreen = ({ navigation, route }) => {
  const { isFavorite, addFavorite, removeFavorite } = useApp();
  const provider = route.params?.provider || {};
  const [activeTab, setActiveTab] = useState(0);
  const fav = isFavorite(provider.id);
  const toggleFav = () => (fav ? removeFavorite(provider.id) : addFavorite(provider.id));
  const avgRating = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <LinearGradient colors={[colors.services.plumbing, '#1E40AF']} style={styles.hero}><Ionicons name="business" size={80} color={colors.white} /></LinearGradient>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={22} color={colors.white} /></TouchableOpacity>
          <TouchableOpacity style={[styles.backBtn, styles.favBtn]} onPress={toggleFav}><Ionicons name={fav ? 'heart' : 'heart-outline'} size={22} color={fav ? '#F87171' : colors.white} /></TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.providerName}>{provider.name || 'Müller GmbH'}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={16} color={colors.accent.main} />
            <Text style={styles.rating}>{provider.rating || '4.9'}</Text>
            <Text style={styles.reviews}>({provider.reviews || 234} Bewertungen)</Text>
            {provider.verified ? <Badge label="Verifiziert" color={colors.status.success} /> : null}
          </View>
          <Text style={styles.distance}>{provider.distance || '1.2 km'} entfernt</Text>

          <View style={styles.statsRow}>
            {[{ val: provider.jobs || 450, lbl: 'Aufträge' }, { val: provider.responseTime || '< 10 Min', lbl: 'Antwortzeit' }, { val: '98%', lbl: 'Erfolgsrate' }].map((s, i) => (
              <View key={i} style={styles.statBlock}><Text style={styles.statVal}>{s.val}</Text><Text style={styles.statLbl}>{s.lbl}</Text></View>
            ))}
          </View>
        </View>

        <View style={styles.tabBar}>
          {TABS.map((tab, i) => (
            <TouchableOpacity key={i} style={[styles.tab, activeTab === i && styles.tabActive]} onPress={() => setActiveTab(i)}>
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === 0 ? (
            <View>
              <Text style={styles.descText}>Professionelle Sanitär- und Heizungsinstallation seit über 20 Jahren. Wir bieten schnellen und zuverlässigen Service für alle Ihre Bedürfnisse.</Text>
              <Card style={styles.infoSection}>
                <Text style={styles.infoSectionTitle}>Öffnungszeiten</Text>
                {[['Mo–Fr', '08:00–18:00'], ['Sa', '09:00–14:00'], ['So', 'Notdienst']].map(([k, v]) => (
                  <View key={k} style={styles.infoRow}><Text style={styles.infoKey}>{k}</Text><Text style={styles.infoVal}>{v}</Text></View>
                ))}
              </Card>
              <Card style={styles.infoSection}>
                <Text style={styles.infoSectionTitle}>Zahlungsmethoden</Text>
                <View style={styles.paymentRow}>
                  {[{ icon: 'card', label: 'Kreditkarte' }, { icon: 'cash', label: 'Bar' }, { icon: 'phone-portrait', label: 'SEPA' }].map((p) => (
                    <View key={p.label} style={styles.paymentChip}><Ionicons name={p.icon} size={18} color={colors.gray[700]} /><Text style={styles.paymentLabel}>{p.label}</Text></View>
                  ))}
                </View>
              </Card>
            </View>
          ) : null}

          {activeTab === 1 ? (
            <View>
              <View style={styles.avgRow}>
                <Text style={styles.avgNum}>{avgRating.toFixed(1)}</Text>
                <View>
                  <View style={styles.starsRow}>{[1,2,3,4,5].map((s) => <Ionicons key={s} name={s <= Math.round(avgRating) ? 'star' : 'star-outline'} size={18} color={colors.accent.main} />)}</View>
                  <Text style={styles.totalReviews}>{REVIEWS.length} Bewertungen</Text>
                </View>
              </View>
              {REVIEWS.map((r) => (
                <Card key={r.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}><Text style={styles.reviewInitial}>{r.author[0]}</Text></View>
                    <View style={styles.reviewMeta}><Text style={styles.reviewAuthor}>{r.author}</Text><Text style={styles.reviewDate}>{r.date}</Text></View>
                    <View style={styles.reviewStars}>{[1,2,3,4,5].map((s) => <Ionicons key={s} name={s <= r.rating ? 'star' : 'star-outline'} size={13} color={colors.accent.main} />)}</View>
                  </View>
                  <Text style={styles.reviewComment}>{r.comment}</Text>
                </Card>
              ))}
            </View>
          ) : null}

          {activeTab === 2 ? (
            <View>
              {['Rohrverstopfung', 'Wasserhahn Installation', 'Heizungsreparatur', 'Notfall-Service 24/7', 'Sanitär-Wartung', 'Boiler Service'].map((s) => (
                <View key={s} style={styles.serviceItem}><Ionicons name="checkmark-circle" size={20} color={colors.status.success} /><Text style={styles.serviceItemText}>{s}</Text></View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View><Text style={styles.priceFrom}>Ab</Text><Text style={styles.price}>€80/Std</Text></View>
        <Button onPress={() => navigation.navigate('Booking', { provider })} icon="calendar" style={styles.bookBtn}>Jetzt buchen</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  heroWrap: { position: 'relative' },
  hero: { height: 280, alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 60, left: spacing.xl, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  favBtn: { left: undefined, right: spacing.xl },
  infoCard: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: spacing.md, backgroundColor: colors.white },
  providerName: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.gray[900], marginBottom: spacing.xs },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xs, flexWrap: 'wrap' },
  rating: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  reviews: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  distance: { fontSize: typography.fontSize.sm, color: colors.gray[500], marginBottom: spacing.md },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  statBlock: { flex: 1, backgroundColor: colors.gray[50], borderRadius: borderRadius.md, padding: spacing.sm, alignItems: 'center' },
  statVal: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.gray[900] },
  statLbl: { fontSize: typography.fontSize.xs, color: colors.gray[500] },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.gray[200] },
  tab: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.accent.main },
  tabText: { fontSize: typography.fontSize.base, color: colors.gray[500] },
  tabTextActive: { fontWeight: typography.fontWeight.semiBold, color: colors.accent.main },
  tabContent: { padding: spacing.xl },
  descText: { fontSize: typography.fontSize.base, color: colors.gray[700], lineHeight: 26, marginBottom: spacing.lg },
  infoSection: { marginBottom: spacing.md },
  infoSectionTitle: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900], marginBottom: spacing.sm },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  infoKey: { fontSize: typography.fontSize.base, color: colors.gray[600] },
  infoVal: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  paymentRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  paymentChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.gray[100], borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, gap: 4 },
  paymentLabel: { fontSize: typography.fontSize.sm, color: colors.gray[700] },
  avgRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.lg },
  avgNum: { fontSize: 56, fontWeight: typography.fontWeight.bold, color: colors.gray[900] },
  starsRow: { flexDirection: 'row', gap: 2, marginBottom: 4 },
  totalReviews: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  reviewCard: { marginBottom: spacing.sm },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.accent.main, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  reviewInitial: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.white },
  reviewMeta: { flex: 1 },
  reviewAuthor: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  reviewDate: { fontSize: typography.fontSize.xs, color: colors.gray[500] },
  reviewStars: { flexDirection: 'row', gap: 2 },
  reviewComment: { fontSize: typography.fontSize.sm, color: colors.gray[700], lineHeight: 21 },
  serviceItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.gray[100], gap: spacing.sm },
  serviceItemText: { fontSize: typography.fontSize.base, color: colors.gray[900] },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, gap: spacing.md, ...shadows.xl },
  priceFrom: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  price: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.gray[900] },
  bookBtn: { flex: 1 },
});

export default ProviderDetailScreen;
