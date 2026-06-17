import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button } from '../../components/common';
import { useBookings } from '../../hooks';
import { locationService } from '../../services';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const EMERGENCY_TYPES = [
  { id: '1', label: 'Wasserrohrbruch',   icon: 'water',   color: colors.services.plumbing   },
  { id: '2', label: 'Stromausfall',       icon: 'flash',   color: colors.services.electrical },
  { id: '3', label: 'Heizungsausfall',    icon: 'flame',   color: colors.services.hvac       },
  { id: '4', label: 'Tür/Schloss defekt', icon: 'key',     color: colors.services.carpentry  },
  { id: '5', label: 'Gasleck',            icon: 'warning', color: colors.status.error        },
  { id: '6', label: 'Sonstiges',          icon: 'build',   color: colors.gray[600]           },
];

const EmergencyBookingScreen = ({ navigation }) => {
  const { create } = useBookings();
  const [selected, setSelected]       = useState(null);
  const [description, setDescription] = useState('');
  const address = locationService.formatAddress();

  const handleBook = async () => {
    if (!selected) {
      Alert.alert('Bitte wählen', 'Bitte wählen Sie die Art des Notfalls.');
      return;
    }
    const type = EMERGENCY_TYPES.find((t) => t.id === selected);
    const now = new Date();
    await create({
      service:  type.label,
      provider: 'Notfall-Dienst',
      date:     now.toLocaleDateString('de-DE'),
      time:     now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      status:   'pending',
      urgency:  'emergency',
      total:    130,
    });
    Alert.alert('🚨 Notfall gemeldet!', 'Ein Techniker ist auf dem Weg zu Ihnen. Geschätzte Ankunftszeit: 30–60 Minuten.', [
      { text: 'OK', onPress: () => navigation.navigate('Home') },
    ]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.status.error, '#B91C1C']} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={colors.white} /></TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.alertIcon}><Ionicons name="alert-circle" size={48} color={colors.white} /></View>
          <Text style={styles.headerTitle}>Notfall-Service</Text>
          <Text style={styles.headerSubtitle}>24/7 Sofortiger Einsatz</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.etaCard}>
          <View style={styles.etaRow}>
            {[{ icon: 'time', label: 'Ankunft', value: '30–60 Min' }, { icon: 'people', label: 'Techniker', value: '4 verfügbar' }, { icon: 'call', label: 'Hotline', value: '0800 123 456' }].map((e, i) => (
              <View key={i} style={styles.etaItem}><Ionicons name={e.icon} size={22} color={colors.status.error} /><Text style={styles.etaValue}>{e.value}</Text><Text style={styles.etaLabel}>{e.label}</Text></View>
            ))}
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Art des Notfalls</Text>
        <View style={styles.typeGrid}>
          {EMERGENCY_TYPES.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[styles.typeCard, selected === type.id && { borderColor: type.color }]}
              onPress={() => setSelected(type.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.typeIcon, { backgroundColor: type.color + (selected === type.id ? 'FF' : '22') }]}>
                <Ionicons name={type.icon} size={26} color={selected === type.id ? colors.white : type.color} />
              </View>
              <Text style={[styles.typeLabel, selected === type.id && { color: type.color, fontWeight: typography.fontWeight.semiBold }]}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Problembeschreibung</Text>
        <View style={styles.descriptionInput}>
          <TextInput style={styles.descText} placeholder="Beschreiben Sie das Problem kurz…" placeholderTextColor={colors.gray[400]} value={description} onChangeText={setDescription} multiline numberOfLines={4} />
        </View>

        <Card style={styles.addressCard}>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={20} color={colors.status.error} />
            <View style={styles.addressInfo}><Text style={styles.addressLabel}>Ihr Standort</Text><Text style={styles.addressValue}>{address}</Text></View>
            <TouchableOpacity><Text style={styles.changeAddress}>Ändern</Text></TouchableOpacity>
          </View>
        </Card>

        <View style={styles.warningBox}>
          <Ionicons name="warning" size={18} color={colors.status.warning} />
          <Text style={styles.warningText}>Bei Lebensgefahr rufen Sie sofort den Notruf 112 an.</Text>
        </View>

        <Button onPress={handleBook} style={styles.bookBtn} size="lg">🚨  Notfall jetzt melden</Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  header: { paddingTop: 60, paddingBottom: spacing.xl, alignItems: 'center' },
  backBtn: { position: 'absolute', top: 60, left: spacing.xl, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerContent: { alignItems: 'center' },
  alertIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  headerTitle: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.white },
  headerSubtitle: { fontSize: typography.fontSize.base, color: colors.white, opacity: 0.9 },
  content: { padding: spacing.xl, paddingBottom: spacing['2xl'] },
  etaCard: { marginBottom: spacing.xl },
  etaRow: { flexDirection: 'row', justifyContent: 'space-around' },
  etaItem: { alignItems: 'center', gap: 4 },
  etaValue: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.bold, color: colors.gray[900] },
  etaLabel: { fontSize: typography.fontSize.xs, color: colors.gray[500] },
  sectionTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900], marginBottom: spacing.md },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
  typeCard: { width: '30.5%', backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center', borderWidth: 2, borderColor: 'transparent', ...shadows.sm },
  typeIcon: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
  typeLabel: { fontSize: typography.fontSize.xs, color: colors.gray[700], textAlign: 'center', marginTop: 2 },
  descriptionInput: { backgroundColor: colors.white, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.gray[200], padding: spacing.md, marginBottom: spacing.xl, minHeight: 100 },
  descText: { fontSize: typography.fontSize.base, color: colors.gray[900], lineHeight: 22 },
  addressCard: { marginBottom: spacing.xl },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  addressInfo: { flex: 1 },
  addressLabel: { fontSize: typography.fontSize.xs, color: colors.gray[500] },
  addressValue: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  changeAddress: { fontSize: typography.fontSize.sm, color: colors.accent.main, fontWeight: typography.fontWeight.medium },
  warningBox: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.status.warning + '14', borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.xl },
  warningText: { flex: 1, fontSize: typography.fontSize.sm, color: colors.gray[700] },
  bookBtn: { backgroundColor: colors.status.error },
});

export default EmergencyBookingScreen;
