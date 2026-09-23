import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Header, Input } from '../../components/common';
import { SERVICE_FEE_RATE } from '../../constants/pricing';
import { useBookings } from '../../hooks';
import { useApp } from '../../context/AppContext';
import paymentService from '../../services/paymentService';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

// iOS only ever offers Apple Pay, Android only Google Pay — there's no
// device that could show both, so the picker shows exactly one wallet
// option alongside card/cash, matching what the OS itself would offer.
const WALLET_METHOD = Platform.OS === 'ios' ? 'apple_pay' : 'google_pay';
const WALLET_ICON = Platform.OS === 'ios' ? 'logo-apple' : 'logo-google';

const BookingConfirmationScreen = ({ navigation, route }) => {
  const { create, loading } = useBookings();
  const { user } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const { provider, date, scheduledDate, time, urgency, frequency, subtotal, fee, estimatedTotal, service, hideFrequency } = route.params;
  const isEmergency = urgency === 'emergency';
  // subtotal/fee always arrive from BookingScreen now — this screen never
  // recomputes its own price, so what the customer confirmed here is
  // guaranteed to be the exact number they saw on the previous screen.
  const total = estimatedTotal;

  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [addressError, setAddressError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const PAYMENT_OPTIONS = [
    { key: 'card', label: t('bookingConfirmation.payCard'), icon: 'card-outline' },
    { key: WALLET_METHOD, label: t(`bookingConfirmation.pay${WALLET_METHOD === 'apple_pay' ? 'ApplePay' : 'GooglePay'}`), icon: WALLET_ICON },
    { key: 'cash', label: t('bookingConfirmation.payCash'), icon: 'cash-outline' },
  ];

  const handleConfirm = async () => {
    if (!street.trim() || !postalCode.trim() || !city.trim()) {
      setAddressError(t('bookingConfirmation.addressRequired'));
      return;
    }
    setAddressError('');
    const result = await create({
      service:  service || t('home.plumber'),
      provider: provider.name || 'Rüttenscheider Sanitärtechnik GmbH',
      providerId: provider.id,
      providerType: provider.providerType,
      categoryCode: provider.categoryCode,
      clientPhone: user?.phone,
      addressStreet: street.trim(),
      addressPostalCode: postalCode.trim(),
      addressCity: city.trim(),
      date, scheduledDate, time, urgency, total, frequency,
    });
    if (!result.success) { setAddressError(result.error); return; }

    // Best-effort — the booking itself already succeeded, so a payment-
    // record hiccup (simulated, shouldn't realistically fail) shouldn't
    // block the customer from seeing their confirmed booking.
    await paymentService.createPayment(result.booking.id, paymentMethod);

    // Resets the stack so Reservation Details can't go back into this
    // now-stale, already-submitted form — only forward actions (e.g. Back
    // to Home) make sense from here.
    navigation.reset({
      index: 1,
      routes: [{ name: 'MainTabs' }, { name: 'BookingDetail', params: { booking: result.booking } }],
    });
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
          <Row d={d} icon="business-outline" label={t('bookingConfirmation.provider')} value={provider.name || 'Rüttenscheider Sanitärtechnik GmbH'} />
          <Divider d={d} />
          <Row d={d} icon="star-outline" label={t('bookingConfirmation.rating')} value={`${provider.rating || '4.9'}`} />
        </View>

        <View style={styles.card}>
          <Row d={d} icon="calendar-outline" label={t('bookingConfirmation.date')} value={date} />
          <Divider d={d} />
          <Row d={d} icon="time-outline" label={t('bookingConfirmation.time')} value={time} />
          {!hideFrequency ? (
            <>
              <Divider d={d} />
              <Row d={d} icon="alert-circle-outline" label={t('bookingConfirmation.urgencyLabel')} value={isEmergency ? t('bookingConfirmation.emergency') : t('bookingConfirmation.normal')} valueStyle={{ color: isEmergency ? d.danger : d.green, fontWeight: '700' }} />
            </>
          ) : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('bookingConfirmation.costOverview')}</Text>
          <View style={styles.priceRows}>
            <PriceRow d={d} label={t('booking.servicePrice')} value={`€${subtotal}`} />
            <PriceRow d={d} label={t('booking.serviceFee', { rate: Math.round(SERVICE_FEE_RATE * 100) })} value={`€${fee}`} />
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.totalRow}><Text style={styles.totalLabel}>{t('bookingConfirmation.total')}</Text><Text style={styles.totalValue}>€{total}</Text></View>
          <Text style={styles.vatNote}>{t('booking.vatNote')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('bookingConfirmation.addressTitle')}</Text>
          <Input label={t('bookingConfirmation.street')} placeholder={t('bookingConfirmation.streetPlaceholder')} value={street} onChangeText={setStreet} />
          <View style={styles.addressRow}>
            <Input label={t('bookingConfirmation.postalCode')} placeholder={t('bookingConfirmation.postalCodePlaceholder')} value={postalCode} onChangeText={setPostalCode} keyboardType="number-pad" containerStyle={styles.addressRowItem} />
            <Input label={t('bookingConfirmation.city')} placeholder={t('bookingConfirmation.cityPlaceholder')} value={city} onChangeText={setCity} containerStyle={[styles.addressRowItem, { flex: 2 }]} />
          </View>
          {addressError ? <Text style={styles.addressError}>{addressError}</Text> : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('bookingConfirmation.paymentTitle')}</Text>
          <View style={styles.paymentRow}>
            {PAYMENT_OPTIONS.map((opt) => {
              const active = paymentMethod === opt.key;
              return (
                <TouchableOpacity key={opt.key} style={styles.paymentTouchable} onPress={() => setPaymentMethod(opt.key)}>
                  <View style={[styles.paymentCard, active && styles.paymentCardActive]}>
                    <Ionicons name={opt.icon} size={20} color={active ? d.canvas : d.line} />
                    <Text style={[styles.paymentLabel, active && styles.paymentLabelActive]}>{opt.label}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.paymentHint}>
            {paymentMethod === 'cash' ? t('bookingConfirmation.payCashHint') : t('bookingConfirmation.payAppHint')}
          </Text>
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
  vatNote: { fontSize: 10.5, color: d.textSoft, marginTop: 8 },
  addressRow: { flexDirection: 'row', gap: 10 },
  addressRowItem: { flex: 1 },
  addressError: { fontSize: 11.5, color: d.danger, marginTop: -6, marginBottom: 4 },
  paymentRow: { flexDirection: 'row', gap: 8 },
  paymentTouchable: { flex: 1 },
  paymentCard: { backgroundColor: d.canvas, borderRadius: 12, padding: 12, alignItems: 'center', gap: 6, borderWidth: 1, borderColor: d.lineSoft },
  paymentCardActive: { backgroundColor: d.line, borderColor: d.line },
  paymentLabel: { fontSize: 11.5, fontWeight: '600', color: d.text, textAlign: 'center' },
  paymentLabelActive: { color: d.canvas },
  paymentHint: { fontSize: 11, color: d.textSoft, marginTop: 10, lineHeight: 16 },
  infoBox: { flexDirection: 'row', backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, padding: 12, gap: 8 },
  infoText: { flex: 1, fontSize: 12, color: d.textSoft, lineHeight: 18 },
  footer: { flexDirection: 'row', backgroundColor: d.panel, borderTopWidth: 1, borderTopColor: d.lineSoft, paddingHorizontal: 18, paddingVertical: 14, gap: 10 },
  backBtn: { flex: 1 },
  confirmBtn: { flex: 2 },
});

export default BookingConfirmationScreen;
