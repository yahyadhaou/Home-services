import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Badge } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');

const SERVICES = [
  { id: '1', name: 'Klempner',   icon: 'water',         color: colors.services.plumbing,   available: 12 },
  { id: '2', name: 'Elektriker', icon: 'flash',         color: colors.services.electrical, available: 8  },
  { id: '3', name: 'Reinigung',  icon: 'sparkles',      color: colors.services.cleaning,   available: 15 },
  { id: '4', name: 'Heizung',    icon: 'thermometer',   color: colors.services.hvac,       available: 6  },
  { id: '5', name: 'Schreiner',  icon: 'hammer',        color: colors.services.carpentry,  available: 10 },
  { id: '6', name: 'Maler',      icon: 'color-palette', color: colors.services.painting,   available: 14 },
  { id: '7', name: 'Gärtner',    icon: 'leaf',          color: colors.services.gardening,  available: 9  },
  { id: '8', name: 'Umzug',      icon: 'car',           color: colors.services.moving,     available: 5  },
];

const MOCK_BOOKINGS = [
  { id: 'm1', service: 'Klempner',  provider: 'Müller GmbH', date: '15.05.2025', time: '14:00', status: 'confirmed' },
  { id: 'm2', service: 'Reinigung', provider: 'Clean Pro',   date: '10.05.2025', time: '10:00', status: 'completed' },
];

const STATUS_COLOR = { confirmed: colors.status.info, completed: colors.status.success, pending: colors.status.warning };
const STATUS_LABEL = { confirmed: 'Bestätigt', completed: 'Abgeschlossen', pending: 'Ausstehend' };

const HomeScreen = ({ navigation }) => {
  const { user, bookings } = useApp();
  const displayBookings = bookings.length > 0 ? bookings : MOCK_BOOKINGS;

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.primary.main, colors.primary.light]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Guten Tag,</Text>
            <Text style={styles.userName}>{user?.name || 'Willkommen!'}</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications-outline" size={22} color={colors.white} />
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Profile')}>
              <Ionicons name="person-outline" size={22} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.searchBar} activeOpacity={0.8} onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search" size={20} color={colors.gray[400]} />
          <Text style={styles.searchPlaceholder}>Suche nach Dienstleistungen…</Text>
          <Ionicons name="options-outline" size={20} color={colors.gray[500]} />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.navigate('EmergencyBooking')} style={styles.emergencyWrapper}>
          <LinearGradient colors={[colors.status.error, '#B91C1C']} style={styles.emergencyBanner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <Ionicons name="alert-circle" size={32} color={colors.white} />
            <View style={styles.emergencyBody}>
              <Text style={styles.emergencyTitle}>Notfall-Service</Text>
              <Text style={styles.emergencySubtitle}>24/7 sofort verfügbar</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Dienstleistungen</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Alle ansehen</Text></TouchableOpacity>
          </View>
          <View style={styles.servicesGrid}>
            {SERVICES.map((s) => (
              <TouchableOpacity key={s.id} style={styles.serviceCard} onPress={() => navigation.navigate('ServiceCategory', { service: s.name })} activeOpacity={0.7}>
                <View style={[styles.serviceIconWrap, { backgroundColor: s.color }]}><Ionicons name={s.icon} size={26} color={colors.white} /></View>
                <Text style={styles.serviceName} numberOfLines={1}>{s.name}</Text>
                <Text style={styles.serviceAvail}>{s.available} verfügbar</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Letzte Buchungen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyBookings')}><Text style={styles.seeAll}>Alle ansehen</Text></TouchableOpacity>
          </View>
          {displayBookings.slice(0, 2).map((b) => (
            <TouchableOpacity key={b.id} onPress={() => navigation.navigate('BookingDetail', { booking: b })}>
              <Card style={styles.bookingCard}>
                <View style={[styles.bookingBar, { backgroundColor: STATUS_COLOR[b.status] || colors.gray[300] }]} />
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingService}>{b.service}</Text>
                  <Text style={styles.bookingProvider}>{b.provider}</Text>
                  <Text style={styles.bookingDate}>{b.date} · {b.time}</Text>
                </View>
                <Badge label={STATUS_LABEL[b.status] || b.status} color={STATUS_COLOR[b.status] || colors.gray[600]} />
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schnellzugriff</Text>
          <View style={styles.quickRow}>
            {[
              { label: 'Favoriten',     icon: 'heart',    screen: 'Favorites' },
              { label: 'Zahlung',       icon: 'card',     screen: 'PaymentMethods' },
              { label: 'Einstellungen', icon: 'settings', screen: 'Settings' },
            ].map((a) => (
              <TouchableOpacity key={a.label} style={styles.quickCard} onPress={() => navigation.navigate(a.screen)}>
                <Ionicons name={a.icon} size={24} color={colors.accent.main} />
                <Text style={styles.quickLabel}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  header: { paddingTop: 60, paddingBottom: spacing.xl, paddingHorizontal: spacing.xl, borderBottomLeftRadius: borderRadius.xl, borderBottomRightRadius: borderRadius.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  greeting: { fontSize: typography.fontSize.sm, color: colors.white, opacity: 0.85 },
  userName: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.white },
  headerActions: { flexDirection: 'row', gap: spacing.sm },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badge: { position: 'absolute', top: 0, right: 0, backgroundColor: colors.status.error, borderRadius: 10, width: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeText: { fontSize: 10, fontWeight: typography.fontWeight.bold, color: colors.white },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm, ...shadows.sm },
  searchPlaceholder: { flex: 1, fontSize: typography.fontSize.base, color: colors.gray[400] },
  content: { flex: 1 },
  scrollContent: { paddingBottom: spacing.xl },
  emergencyWrapper: { margin: spacing.xl, borderRadius: borderRadius.md, overflow: 'hidden', ...shadows.md },
  emergencyBanner: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, gap: spacing.md },
  emergencyBody: { flex: 1 },
  emergencyTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.white },
  emergencySubtitle: { fontSize: typography.fontSize.sm, color: colors.white, opacity: 0.9 },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semiBold, color: colors.primary.main },
  seeAll: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.accent.main },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  serviceCard: { width: (width - spacing.xl * 2 - spacing.sm * 3) / 4, alignItems: 'center', backgroundColor: colors.white, borderRadius: borderRadius.md, paddingVertical: spacing.sm, paddingHorizontal: 4, ...shadows.sm },
  serviceIconWrap: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
  serviceName: { fontSize: 11, fontWeight: typography.fontWeight.medium, color: colors.gray[800], textAlign: 'center' },
  serviceAvail: { fontSize: 10, color: colors.gray[500], textAlign: 'center' },
  bookingCard: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm, paddingVertical: spacing.md, paddingHorizontal: spacing.md },
  bookingBar: { width: 4, height: 56, borderRadius: 2, marginRight: spacing.md },
  bookingInfo: { flex: 1 },
  bookingService: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  bookingProvider: { fontSize: typography.fontSize.sm, color: colors.gray[600], marginTop: 2 },
  bookingDate: { fontSize: typography.fontSize.xs, color: colors.gray[500], marginTop: 2 },
  quickRow: { flexDirection: 'row', gap: spacing.md },
  quickCard: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center', ...shadows.sm },
  quickLabel: { fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: colors.gray[700], marginTop: spacing.xs, textAlign: 'center' },
});

export default HomeScreen;
