import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Header } from '../../components/common';
import { useBookings } from '../../hooks';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const BookingConfirmationScreen = ({ navigation, route }) => {
  const { create, loading } = useBookings();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const { provider, date, time, urgency, frequency, estimatedTotal } = route.params;
  const isEmergency   = urgency === 'emergency';
  const basePrice     = 80;
  const servicePrice  = 40;
  const emergencyFee  = isEmergency ? 30 : 0;
  const total         = estimatedTotal ?? (basePrice + servicePrice + emergencyFee);

  const handleConfirm = async () => {
    const result = await create({
      service:  t('home.plumber'),
      provider: provider.name || 'Müller GmbH',
      date, time, urgency, total, frequency,
    });
    if (result.success) navigation.navigate('BookingDetail', { booking: result.booking });
  };

  return (
    <View style={styles.container}>
      <Header title={t('bookingConfirmation.title')} onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.badge}>
          <Ionicons name="checkmark-circle-outline" size={40} color={d.line} />
          <Text style={styles.badgeTitle}>{t('bookingConfirmation.checkTitle')}</Text>
          <Text style={styles.badgeSubtitle}>{t('bookingConfirmation.checkSubtitle')}</Text>
        </View>

        <View style={styles.card}>
          <Row d={d} icon="business-outline" label={t('bookingConfirmation.provider')} value={provider.name || 'Müller GmbH'} />
          <Divider d={d} />
          <Row d={d} icon="star-outline" label={t('bookingConfirmation.rating')} value={`${provider.rating || '4.9'}`} />
        </View>

        <View style={styles.card}>
          <Row d={d} icon="calendar-outline" label={t('bookingConfirmation.date')} value={date} />
          <Divider d={d} />
          <Row d={d} icon="time-outline" label={t('bookingConfirmation.time')} value={time} />
          <Divider d={d} />
          <Row d={d} icon="alert-circle-outline" label={t('bookingConfirmation.urgencyLabel')} value={isEmergency ? t('bookingConfirmation.emergency') : t('bookingConfirmation.normal')} valueStyle={{ color: isEmergency ? d.danger : d.green, fontWeight: '700' }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('bookingConfirmation.costOverview')}</Text>
          <View style={styles.priceRows}>
            <PriceRow d={d} label={t('bookingConfirmation.baseFee')} value={`€${basePrice}`} />
            <PriceRow d={d} label={t('bookingConfirmation.service')} value={`€${servicePrice}`} />
            {isEmergency ? <PriceRow d={d} label={t('bookingConfirmation.emergencyFee')} value={`€${emergencyFee}`} highlight /> : null}
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.totalRow}><Text style={styles.totalLabel}>{t('bookingConfirmation.total')}</Text><Text style={styles.totalValue}>€{total}</Text></View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={16} color={d.line} />
          <Text style={styles.infoText}>{t('bookingConfirmation.infoText')}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="outline" onPress={() => navigation.goBack()} style={styles.backBtn}>{t('bookingConfirmation.back')}</Button>
        <Button onPress={handleConfirm} loading={loading} icon="checkmark" style={styles.confirmBtn}>{t('bookingConfirmation.confirmButton')}</Button>
      </View>
    </View>
  );
};

const Row = ({ d, icon, label, value, valueStyle }) => {
  const s = createRowStyles(d);
  return (
    <View style={s.row}>
      <View style={s.left}><Ionicons name={icon} size={15} color={d.line} /><Text style={s.label}>{label}</Text></View>
      <Text style={[s.value, valueStyle]}>{value}</Text>
    </View>
  );
};
const createRowStyles = (d) => StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 13, color: d.textSoft },
  value: { fontSize: 13, fontWeight: '600', color: d.text },
});

const Divider = ({ d }) => <View style={{ height: 1, backgroundColor: d.lineSoft, marginVertical: 2 }} />;

const PriceRow = ({ d, label, value, highlight }) => {
  const s = createPriceStyles(d);
  return (
    <View style={s.row}><Text style={[s.label, highlight && s.highlight]}>{label}</Text><Text style={[s.value, highlight && s.highlight]}>{value}</Text></View>
  );
};
const createPriceStyles = (d) => StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  label: { fontSize: 13, color: d.textSoft },
  value: { fontSize: 13, fontWeight: '600', color: d.text, fontFamily: MONO },
  highlight: { color: d.danger },
});

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  scrollContent: { padding: 18, paddingBottom: 100 },
  badge: { borderRadius: 14, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, padding: 20, alignItems: 'center', marginBottom: 16 },
  badgeTitle: { fontSize: 18, fontWeight: '700', color: d.text, marginTop: 10 },
  badgeSubtitle: { fontSize: 13, color: d.textSoft, marginTop: 2 },
  card: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, marginBottom: 12, padding: 14 },
  cardTitle: { fontSize: 13.5, fontWeight: '700', color: d.text, marginBottom: 8 },
  priceRows: { gap: 2 },
  priceDivider: { height: 1, backgroundColor: d.lineSoft, marginVertical: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 15, fontWeight: '700', color: d.text },
  totalValue: { fontSize: 20, fontWeight: '700', color: d.text, fontFamily: MONO },
  infoBox: { flexDirection: 'row', backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, padding: 12, gap: 8 },
  infoText: { flex: 1, fontSize: 12, color: d.textSoft, lineHeight: 18 },
  footer: { flexDirection: 'row', backgroundColor: d.panel, borderTopWidth: 1, borderTopColor: d.lineSoft, paddingHorizontal: 18, paddingVertical: 14, gap: 10 },
  backBtn: { flex: 1 },
  confirmBtn: { flex: 2 },
});

export default BookingConfirmationScreen;
