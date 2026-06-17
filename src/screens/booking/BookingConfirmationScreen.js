import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button, Header } from '../../components/common';
import { useBookings } from '../../hooks';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const BookingConfirmationScreen = ({ navigation, route }) => {
  const { create, loading } = useBookings();
  const { provider, date, time, urgency } = route.params;
  const isEmergency   = urgency === 'emergency';
  const basePrice     = 80;
  const servicePrice  = 40;
  const emergencyFee  = isEmergency ? 30 : 0;
  const total         = basePrice + servicePrice + emergencyFee;

  const handleConfirm = async () => {
    const result = await create({
      service:  'Handwerker',
      provider: provider.name || 'Müller GmbH',
      date, time, urgency, total,
    });
    if (result.success) navigation.navigate('BookingDetail', { booking: result.booking });
  };

  return (
    <View style={styles.container}>
      <Header title="Buchung bestätigen" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[colors.status.success, '#047857']} style={styles.badge}>
          <Ionicons name="checkmark-circle" size={64} color={colors.white} />
          <Text style={styles.badgeTitle}>Buchung prüfen</Text>
          <Text style={styles.badgeSubtitle}>Bitte alle Details bestätigen</Text>
        </LinearGradient>

        <Card style={styles.card}>
          <Row icon="business" label="Dienstleister" value={provider.name || 'Müller GmbH'} />
          <Divider />
          <Row icon="star" label="Bewertung" value={`${provider.rating || '4.9'} ⭐`} />
        </Card>

        <Card style={styles.card}>
          <Row icon="calendar" label="Datum" value={date} />
          <Divider />
          <Row icon="time" label="Uhrzeit" value={time} />
          <Divider />
          <Row icon="alert-circle" label="Dringlichkeit" value={isEmergency ? 'Notfall' : 'Normal'} valueStyle={{ color: isEmergency ? colors.status.error : colors.status.success, fontWeight: typography.fontWeight.semiBold }} />
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Kostenübersicht</Text>
          <View style={styles.priceRows}>
            <PriceRow label="Grundgebühr" value={`€${basePrice}`} />
            <PriceRow label="Service" value={`€${servicePrice}`} />
            {isEmergency ? <PriceRow label="Notfall-Zuschlag" value={`€${emergencyFee}`} highlight /> : null}
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Gesamtbetrag</Text><Text style={styles.totalValue}>€{total}</Text></View>
        </Card>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color={colors.status.info} />
          <Text style={styles.infoText}>Sie erhalten eine Bestätigung per E-Mail. Der Dienstleister meldet sich 30 Minuten vor dem Termin.</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="outline" onPress={() => navigation.goBack()} style={styles.backBtn}>Zurück</Button>
        <Button onPress={handleConfirm} loading={loading} icon="checkmark" style={styles.confirmBtn}>Jetzt buchen</Button>
      </View>
    </View>
  );
};

const Row = ({ icon, label, value, valueStyle }) => (
  <View style={rowStyles.row}>
    <View style={rowStyles.left}><Ionicons name={icon} size={18} color={colors.accent.main} /><Text style={rowStyles.label}>{label}</Text></View>
    <Text style={[rowStyles.value, valueStyle]}>{value}</Text>
  </View>
);
const rowStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.xs },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  label: { fontSize: typography.fontSize.base, color: colors.gray[600] },
  value: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
});

const Divider = () => <View style={{ height: 1, backgroundColor: colors.gray[100], marginVertical: 4 }} />;

const PriceRow = ({ label, value, highlight }) => (
  <View style={priceStyles.row}><Text style={[priceStyles.label, highlight && priceStyles.highlight]}>{label}</Text><Text style={[priceStyles.value, highlight && priceStyles.highlight]}>{value}</Text></View>
);
const priceStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  label: { fontSize: typography.fontSize.base, color: colors.gray[600] },
  value: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  highlight: { color: colors.status.error },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  scrollContent: { padding: spacing.xl, paddingBottom: 100 },
  badge: { borderRadius: borderRadius.lg, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.lg },
  badgeTitle: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.white, marginTop: spacing.sm },
  badgeSubtitle: { fontSize: typography.fontSize.base, color: colors.white, opacity: 0.9 },
  card: { marginBottom: spacing.md, padding: spacing.md },
  cardTitle: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900], marginBottom: spacing.sm },
  priceRows: { gap: 2 },
  priceDivider: { height: 1, backgroundColor: colors.gray[200], marginVertical: spacing.sm },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  totalValue: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.accent.main },
  infoBox: { flexDirection: 'row', backgroundColor: colors.status.info + '14', borderRadius: borderRadius.md, padding: spacing.md, gap: spacing.sm },
  infoText: { flex: 1, fontSize: typography.fontSize.sm, color: colors.gray[700], lineHeight: 20 },
  footer: { flexDirection: 'row', backgroundColor: colors.white, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, gap: spacing.sm, ...shadows.xl },
  backBtn: { flex: 1 },
  confirmBtn: { flex: 2 },
});

export default BookingConfirmationScreen;
