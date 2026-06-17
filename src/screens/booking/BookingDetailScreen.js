import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button, Header } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const STATUS = {
  upcoming:  { label: 'Anstehend',     gradient: [colors.status.info, '#1D4ED8']    },
  confirmed: { label: 'Bestätigt',     gradient: [colors.status.info, '#1D4ED8']    },
  completed: { label: 'Abgeschlossen', gradient: [colors.status.success, '#047857'] },
  pending:   { label: 'Ausstehend',    gradient: [colors.status.warning, '#B45309'] },
};

const BookingDetailScreen = ({ navigation, route }) => {
  const { updateBooking } = useApp();
  const booking = route.params?.booking || {};
  const st = STATUS[booking.status] || STATUS.pending;

  const handleCancel = () => {
    Alert.alert('Buchung stornieren', 'Sind Sie sicher, dass Sie diese Buchung stornieren möchten?', [
      { text: 'Abbrechen', style: 'cancel' },
      { text: 'Stornieren', style: 'destructive', onPress: () => { if (booking.id) updateBooking(booking.id, { status: 'cancelled' }); navigation.goBack(); } },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Buchungsdetails" onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={st.gradient} style={styles.heroBanner}>
          <View style={styles.heroIcon}><Ionicons name="checkmark-circle" size={48} color={colors.white} /></View>
          <Text style={styles.heroStatus}>{st.label}</Text>
          <Text style={styles.heroId}>Buchungs-Nr. #{booking.id || 'B1234'}</Text>
        </LinearGradient>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Buchungsdetails</Text>
          <DetailRow icon="business"  label="Dienstleister"   value={booking.provider || 'Müller GmbH'} />
          <DetailRow icon="construct" label="Dienstleistung"  value={booking.service  || 'Klempner'} />
          <DetailRow icon="calendar"  label="Datum"           value={booking.date     || '15.05.2025'} />
          <DetailRow icon="time"      label="Uhrzeit"         value={booking.time     || '14:00'} />
          <DetailRow icon="location"  label="Adresse"         value="Musterstraße 1, 45127 Essen" />
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Zahlung</Text>
          <DetailRow icon="cash" label="Betrag"          value={booking.total ? `€${booking.total}` : '€120'} />
          <DetailRow icon="card" label="Zahlungsmethode" value="SEPA Lastschrift" />
        </Card>

        {(booking.status === 'upcoming' || booking.status === 'confirmed' || booking.status === 'pending') ? (
          <View style={styles.actions}>
            <Button onPress={() => navigation.navigate('Chat', { provider: { name: booking.provider } })} variant="outline" icon="chatbubble-outline">Nachricht senden</Button>
            <Button onPress={handleCancel} variant="ghost" style={styles.cancelBtn}>Buchung stornieren</Button>
          </View>
        ) : null}

        {booking.status === 'completed' ? (
          <Button onPress={() => navigation.navigate('ProviderDetail', { provider: { name: booking.provider, id: '1' } })} variant="outline" icon="star-outline">
            Bewertung abgeben
          </Button>
        ) : null}
      </ScrollView>
    </View>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <View style={detailStyles.row}>
    <View style={detailStyles.left}><View style={detailStyles.iconWrap}><Ionicons name={icon} size={16} color={colors.accent.main} /></View><Text style={detailStyles.label}>{label}</Text></View>
    <Text style={detailStyles.value} numberOfLines={1}>{value}</Text>
  </View>
);
const detailStyles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.gray[100] },
  left: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.accent.main + '18', alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: typography.fontSize.base, color: colors.gray[600] },
  value: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900], maxWidth: '55%' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  scrollContent: { padding: spacing.xl, paddingBottom: spacing['2xl'] },
  heroBanner: { borderRadius: borderRadius.lg, padding: spacing.xl, alignItems: 'center', marginBottom: spacing.lg },
  heroIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  heroStatus: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.white },
  heroId: { fontSize: typography.fontSize.sm, color: colors.white, opacity: 0.85, marginTop: 4 },
  card: { marginBottom: spacing.md, padding: spacing.md },
  cardTitle: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900], marginBottom: spacing.sm },
  actions: { gap: spacing.sm, marginTop: spacing.sm },
  cancelBtn: { marginTop: spacing.xs },
});

export default BookingDetailScreen;
