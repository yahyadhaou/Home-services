import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Badge } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const REVIEWS = [
  { id: '1', author: 'Anna M.',  rating: 5, date: '05.05.2025', comment: 'Sehr professionell und pünktlich. Kann ich nur empfehlen!' },
  { id: '2', author: 'Klaus B.', rating: 4, date: '01.05.2025', comment: 'Gute Arbeit, schnell und sauber.' },
  { id: '3', author: 'Sara T.',  rating: 5, date: '25.04.2025', comment: 'Toller Service, sehr freundlich.' },
];

const ProviderDetailScreen = ({ navigation, route }) => {
  const { isFavorite, addFavorite, removeFavorite } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);

  const provider = route.params?.provider || {};
  const [activeTab, setActiveTab] = useState(0);
  const fav = isFavorite(provider.id);
  const toggleFav = () => (fav ? removeFavorite(provider.id) : addFavorite(provider.id));
  const avgRating = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;

  const TABS = [t('providerDetail.tabAbout'), t('providerDetail.tabReviews'), t('providerDetail.tabServices')];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrap}>
          <View style={styles.hero}>
            <Ionicons name="business-outline" size={56} color={d.line} />
          </View>
          <TouchableOpacity style={[styles.backBtn, { top: insets.top + 10 }]} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={16} color={d.text} /></TouchableOpacity>
          <TouchableOpacity style={[styles.backBtn, styles.favBtn, { top: insets.top + 10 }]} onPress={toggleFav}><Ionicons name={fav ? 'heart' : 'heart-outline'} size={16} color={fav ? d.danger : d.text} /></TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.providerName}>{provider.name || 'Müller GmbH'}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={14} color={d.amber} />
            <Text style={styles.rating}>{provider.rating || '4.9'}</Text>
            <Text style={styles.reviews}>({provider.reviews || 234} {t('providerDetail.reviews')})</Text>
            {provider.verified ? <Badge label={t('providerDetail.verified')} color={d.green} /> : null}
          </View>
          <Text style={styles.distance}>{provider.distance || '1.2 km'}</Text>

          <View style={styles.statsRow}>
            {[
              { val: provider.jobs || 450, lbl: t('providerDetail.jobsCompleted') },
              { val: provider.responseTime || '<10min', lbl: t('providerDetail.responseTime') },
              { val: '98%', lbl: t('providerDetail.successRate') },
            ].map((s, i) => (
              <View key={i} style={styles.statBlock}>
                <Text style={styles.statVal}>{s.val}</Text><Text style={styles.statLbl}>{s.lbl.toUpperCase()}</Text>
              </View>
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
              <Text style={styles.descText}>{t('providerDetail.aboutText')}</Text>
              <View style={styles.infoSection}>
                <Text style={styles.infoSectionTitle}>{t('providerDetail.openingHours')}</Text>
                {[[t('providerDetail.weekday'), '08:00-18:00'], [t('providerDetail.saturday'), '09:00-14:00'], [t('providerDetail.sunday'), t('providerDetail.emergencyOnly')]].map(([k, v]) => (
                  <View key={k} style={styles.infoRow}><Text style={styles.infoKey}>{k}</Text><Text style={styles.infoVal}>{v}</Text></View>
                ))}
              </View>
              <View style={styles.infoSection}>
                <Text style={styles.infoSectionTitle}>{t('providerDetail.paymentMethods')}</Text>
                <View style={styles.paymentRow}>
                  {[{ icon: 'card-outline', label: t('providerDetail.creditCard') }, { icon: 'cash-outline', label: t('providerDetail.cash') }, { icon: 'phone-portrait-outline', label: t('providerDetail.sepa') }].map((p) => (
                    <View key={p.label} style={styles.paymentChip}><Ionicons name={p.icon} size={14} color={d.line} /><Text style={styles.paymentLabel}>{p.label}</Text></View>
                  ))}
                </View>
              </View>
            </View>
          ) : null}

          {activeTab === 1 ? (
            <View>
              <View style={styles.avgRow}>
                <Text style={styles.avgNum}>{avgRating.toFixed(1)}</Text>
                <View>
                  <View style={styles.starsRow}>{[1,2,3,4,5].map((s) => <Ionicons key={s} name={s <= Math.round(avgRating) ? 'star' : 'star-outline'} size={15} color={d.amber} />)}</View>
                  <Text style={styles.totalReviews}>{REVIEWS.length} {t('providerDetail.reviews')}</Text>
                </View>
              </View>
              {REVIEWS.map((r) => (
                <View key={r.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}><Text style={styles.reviewInitial}>{r.author[0]}</Text></View>
                    <View style={styles.reviewMeta}><Text style={styles.reviewAuthor}>{r.author}</Text><Text style={styles.reviewDate}>{r.date}</Text></View>
                    <View style={styles.reviewStars}>{[1,2,3,4,5].map((s) => <Ionicons key={s} name={s <= r.rating ? 'star' : 'star-outline'} size={11} color={d.amber} />)}</View>
                  </View>
                  <Text style={styles.reviewComment}>{r.comment}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {activeTab === 2 ? (
            <View>
              {t('providerDetail.serviceList').map((s) => (
                <View key={s} style={styles.serviceItem}><Ionicons name="checkmark-circle" size={17} color={d.green} /><Text style={styles.serviceItemText}>{s}</Text></View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View><Text style={styles.priceFrom}>{t('providerDetail.from')}</Text><Text style={styles.price}>€80/h</Text></View>
        <Button onPress={() => navigation.navigate('Booking', { provider })} icon="calendar-outline" style={styles.bookBtn}>{t('providerDetail.bookNow')}</Button>
      </View>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  heroWrap: { position: 'relative' },
  hero: { height: 220, alignItems: 'center', justifyContent: 'center', backgroundColor: d.panel, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  backBtn: { position: 'absolute', top: 56, left: 18, width: 32, height: 32, borderRadius: 8, backgroundColor: d.canvas, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  favBtn: { left: undefined, right: 18 },
  infoCard: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 12 },
  providerName: { fontSize: 21, fontWeight: '700', color: d.text, marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4, flexWrap: 'wrap' },
  rating: { fontSize: 14, fontWeight: '700', color: d.text },
  reviews: { fontSize: 12.5, color: d.textSoft },
  distance: { fontSize: 12.5, color: d.textSoft, marginBottom: 14 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statBlock: { flex: 1, borderRadius: 10, padding: 10, alignItems: 'center', backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft },
  statVal: { fontSize: 14, fontWeight: '700', color: d.text, fontFamily: MONO },
  statLbl: { fontSize: 9, color: d.textSoft, marginTop: 2 },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: d.line },
  tabText: { fontSize: 13, color: d.textSoft },
  tabTextActive: { fontWeight: '700', color: d.line },
  tabContent: { padding: 18 },
  descText: { fontSize: 13.5, color: d.textSoft, lineHeight: 22, marginBottom: 18 },
  infoSection: { marginBottom: 14, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, padding: 12 },
  infoSectionTitle: { fontSize: 13, fontWeight: '700', color: d.text, marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  infoKey: { fontSize: 12.5, color: d.textSoft },
  infoVal: { fontSize: 12.5, fontWeight: '600', color: d.text },
  paymentRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  paymentChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: d.canvas, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, gap: 4 },
  paymentLabel: { fontSize: 11.5, color: d.text },
  avgRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 18 },
  avgNum: { fontSize: 44, fontWeight: '700', color: d.text, fontFamily: MONO },
  starsRow: { flexDirection: 'row', gap: 2, marginBottom: 4 },
  totalReviews: { fontSize: 12, color: d.textSoft },
  reviewCard: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, padding: 12, marginBottom: 10 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewAvatar: { width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  reviewInitial: { fontSize: 14, fontWeight: '700', color: d.line },
  reviewMeta: { flex: 1 },
  reviewAuthor: { fontSize: 13, fontWeight: '600', color: d.text },
  reviewDate: { fontSize: 10.5, color: d.textSoft },
  reviewStars: { flexDirection: 'row', gap: 2 },
  reviewComment: { fontSize: 12.5, color: d.textSoft, lineHeight: 19 },
  serviceItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: d.lineSoft, gap: 10 },
  serviceItemText: { fontSize: 13, color: d.text },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', backgroundColor: d.panel, borderTopWidth: 1, borderTopColor: d.lineSoft, paddingHorizontal: 18, paddingVertical: 14, gap: 14 },
  priceFrom: { fontSize: 11, color: d.textSoft },
  price: { fontSize: 20, fontWeight: '700', color: d.text, fontFamily: MONO },
  bookBtn: { flex: 1 },
});

export default ProviderDetailScreen;
