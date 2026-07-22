import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Header } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const BookingDetailScreen = ({ navigation, route }) => {
  const { updateBooking } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const booking = route.params?.booking || {};

  const STATUS = {
    upcoming:  { label: t('myBookings.statusUpcoming'),  color: d.line   },
    confirmed: { label: t('myBookings.statusConfirmed'), color: d.line   },
    completed: { label: t('myBookings.statusCompleted'), color: d.green  },
    pending:   { label: t('myBookings.statusPending'),   color: d.amber  },
  };
  const st = STATUS[booking.status] || STATUS.pending;

  const handleCancel = () => {
    Alert.alert(t('bookingDetail.cancelConfirmTitle'), t('bookingDetail.cancelConfirmBody'), [
      { text: t('bookingDetail.cancelAbort'), style: 'cancel' },
      { text: t('bookingDetail.cancelConfirm'), style: 'destructive', onPress: () => { if (booking.id) updateBooking(booking.id, { status: 'cancelled' }); navigation.goBack(); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title={t('bookingDetail.title')} onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroBanner}>
          <View style={[styles.heroIcon, { borderColor: st.color }]}><Ionicons name="checkmark-circle-outline" size={34} color={st.color} /></View>
          <Text style={[styles.heroStatus, { color: st.color }]}>{st.label.toUpperCase()}</Text>
          <Text style={styles.heroId}>{t('bookingDetail.bookingNumber')}{booking.id || 'B1234'}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('bookingDetail.detailsTitle')}</Text>
          <DetailRow d={d} icon="business-outline"  label={t('bookingDetail.provider')} value={booking.provider || 'Müller GmbH'} />
          <DetailRow d={d} icon="construct-outline" label={t('bookingDetail.service')}  value={booking.service  || 'Klempner'} />
          <DetailRow d={d} icon="calendar-outline"  label={t('bookingDetail.date')}     value={booking.date     || '15.05.2025'} />
          <DetailRow d={d} icon="time-outline"      label={t('bookingDetail.time')}     value={booking.time     || '14:00'} last />
          <DetailRow d={d} icon="location-outline"  label={t('bookingDetail.address')}  value="Musterstraße 1, 45127 Essen" last />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('bookingDetail.paymentTitle')}</Text>
          <DetailRow d={d} icon="cash-outline" label={t('bookingDetail.amount')}        value={booking.total ? `€${booking.total}` : '€120'} />
          <DetailRow d={d} icon="card-outline" label={t('bookingDetail.paymentMethod')} value={t('bookingDetail.sepaDebit')} last />
        </View>

        {(booking.status === 'upcoming' || booking.status === 'confirmed' || booking.status === 'pending') ? (
          <View style={styles.actions}>
            <Button onPress={() => navigation.navigate('LiveTracking', { provider: { name: booking.provider } })} icon="navigate-outline">{t('bookingDetail.trackLive')}</Button>
            <Button onPress={() => navigation.navigate('MainTabs', { screen: 'Chat', params: { provider: { name: booking.provider } } })} variant="outline" icon="chatbubble-outline">{t('bookingDetail.sendMessage')}</Button>
            <Button onPress={handleCancel} variant="ghost" style={styles.cancelBtn}>{t('bookingDetail.cancelBooking')}</Button>
          </View>
        ) : null}

        {booking.status === 'completed' ? (
          <>
            <View style={styles.card}>
              <View style={styles.completeHeader}>
                <Text style={styles.cardTitle}>{t('bookingDetail.jobProof')}</Text>
                <View style={styles.stamp}><Text style={styles.stampText}>{t('bookingDetail.verified').toUpperCase()}</Text></View>
              </View>
              <View style={styles.photoRow}>
                <View style={styles.photoBox}><Ionicons name="image-outline" size={20} color={d.textSoft} /><Text style={styles.photoLabel}>{t('bookingDetail.before')}</Text></View>
                <View style={styles.photoBox}><Ionicons name="image-outline" size={20} color={d.textSoft} /><Text style={styles.photoLabel}>{t('bookingDetail.after')}</Text></View>
              </View>
              {[t('bookingDetail.checklist1'), t('bookingDetail.checklist2'), t('bookingDetail.checklist3')].map((c) => (
                <View key={c} style={styles.checkRow}><Ionicons name="checkmark-circle" size={15} color={d.green} /><Text style={styles.checkText}>{c}</Text></View>
              ))}
            </View>
            <View style={styles.actions}>
              <Button onPress={() => navigation.navigate('Booking', { provider: { name: booking.provider }, service: booking.service })} icon="repeat">{t('home.bookAgain')}</Button>
              <Button onPress={() => navigation.navigate('ProviderDetail', { provider: { name: booking.provider, id: '1' } })} variant="outline" icon="star-outline">
                {t('bookingDetail.leaveReview')}
              </Button>
            </View>
          </>
        ) : null}

        <Button onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} variant="outline" icon="home-outline" style={styles.homeBtn}>
          {t('bookingDetail.backToHome')}
        </Button>
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ d, icon, label, value, last }) => {
  const s = createDetailStyles(d);
  return (
    <View style={[s.row, last && s.rowLast]}>
      <View style={s.left}><Ionicons name={icon} size={15} color={d.line} /><Text style={s.label}>{label}</Text></View>
      <Text style={s.value} numberOfLines={1}>{value}</Text>
    </View>
  );
};
const createDetailStyles = (d) => StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  rowLast: { borderBottomWidth: 0 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 13, color: d.textSoft },
  value: { fontSize: 13, fontWeight: '600', color: d.text, maxWidth: '55%' },
});

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  scrollContent: { padding: 18, paddingBottom: 40 },
  heroBanner: { borderRadius: 14, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, padding: 22, alignItems: 'center', marginBottom: 16 },
  heroIcon: { width: 64, height: 64, borderRadius: 16, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  heroStatus: { fontSize: 15, fontWeight: '700', letterSpacing: 0.4, fontFamily: MONO },
  heroId: { fontSize: 11.5, color: d.textSoft, marginTop: 4, fontFamily: MONO },
  card: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, marginBottom: 12, padding: 14 },
  cardTitle: { fontSize: 13.5, fontWeight: '700', color: d.text, marginBottom: 4 },
  actions: { gap: 10, marginTop: 4, marginBottom: 12 },
  cancelBtn: { marginTop: 0 },
  homeBtn: { marginTop: 8 },
  completeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  stamp: { borderWidth: 1.5, borderColor: d.green, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3, transform: [{ rotate: '-6deg' }] },
  stampText: { fontSize: 9.5, fontWeight: '700', color: d.green, letterSpacing: 0.3, fontFamily: MONO },
  photoRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  photoBox: { flex: 1, aspectRatio: 1.4, backgroundColor: d.canvas, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 4 },
  photoLabel: { fontSize: 10.5, color: d.textSoft },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  checkText: { fontSize: 12.5, color: d.textSoft },
});

export default BookingDetailScreen;
