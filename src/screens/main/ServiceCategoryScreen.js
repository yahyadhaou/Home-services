import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button } from '../../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const { width } = Dimensions.get('window');

const SERVICE_META = {
  Klempner:   { icon: 'water',         color: colors.services.plumbing,   gradient: [colors.services.plumbing, '#1E40AF'] },
  Elektriker: { icon: 'flash',         color: colors.services.electrical, gradient: [colors.services.electrical, '#B45309'] },
  Reinigung:  { icon: 'sparkles',      color: colors.services.cleaning,   gradient: [colors.services.cleaning, '#047857'] },
  Heizung:    { icon: 'thermometer',   color: colors.services.hvac,       gradient: [colors.services.hvac, '#6D28D9'] },
  Schreiner:  { icon: 'hammer',        color: colors.services.carpentry,  gradient: [colors.services.carpentry, '#92400E'] },
  Maler:      { icon: 'color-palette', color: colors.services.painting,   gradient: [colors.services.painting, '#BE185D'] },
  Gärtner:    { icon: 'leaf',          color: colors.services.gardening,  gradient: [colors.services.gardening, '#0F766E'] },
  Umzug:      { icon: 'car',           color: colors.services.moving,     gradient: [colors.services.moving, '#B91C1C'] },
};

const SUB_SERVICES = {
  Klempner:   [{ name: 'Rohrverstopfung', urgent: true }, { name: 'Wasserhahn reparieren' }, { name: 'Toilette reparieren' }, { name: 'Wasserleitung' }, { name: 'Heizung Installation' }, { name: 'Sanitär Installation' }],
  Elektriker: [{ name: 'Steckdose defekt', urgent: true }, { name: 'Sicherung' }, { name: 'Licht installieren' }, { name: 'Kabel verlegen' }, { name: 'Zählerkasten' }, { name: 'Smart Home' }],
  Reinigung:  [{ name: 'Wohnungsreinigung' }, { name: 'Büroreinigung' }, { name: 'Umzugsreinigung' }, { name: 'Fensterreinigung' }, { name: 'Teppichreinigung' }, { name: 'Baureinigung' }],
  default:    [{ name: 'Standard Service' }, { name: 'Express Service', urgent: true }, { name: 'Beratung' }, { name: 'Installation' }, { name: 'Reparatur' }, { name: 'Wartung' }],
};

const FAQS = {
  Klempner:   [{ q: 'Wie schnell kann ein Klempner kommen?', a: 'In Notfällen innerhalb 1-2 Stunden, reguläre Termine am selben oder nächsten Tag.' }, { q: 'Was kostet ein Klempner?', a: 'Durchschnittlich €80–120 pro Stunde plus Material.' }],
  Elektriker: [{ q: 'Welche Qualifikationen haben die Elektriker?', a: 'Alle Elektriker sind geprüfte Fachkräfte mit gültiger VDE-Zertifizierung.' }],
  default:    [{ q: 'Wie wird die Qualität gesichert?', a: 'Alle Dienstleister werden vor Aufnahme geprüft und regelmäßig bewertet.' }],
};

const ServiceCategoryScreen = ({ navigation, route }) => {
  const serviceName = route.params?.service || 'Klempner';
  const meta        = SERVICE_META[serviceName] || SERVICE_META.Klempner;
  const subServices = SUB_SERVICES[serviceName] || SUB_SERVICES.default;
  const faqs        = FAQS[serviceName] || FAQS.default;
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <View style={styles.container}>
      <LinearGradient colors={meta.gradient} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color={colors.white} /></TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn}><Ionicons name="heart-outline" size={24} color={colors.white} /></TouchableOpacity>
        </View>
        <View style={styles.headerBody}>
          <View style={styles.iconCircle}><Ionicons name={meta.icon} size={44} color={colors.white} /></View>
          <Text style={styles.headerTitle}>{serviceName}</Text>
          <Text style={styles.headerSubtitle}>12 Fachkräfte verfügbar</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsRow}>
          {[{ icon: 'star', val: '4.8', lbl: 'Bewertung' }, { icon: 'time', val: '1–2h', lbl: 'Ankunft' }, { icon: 'people', val: '850+', lbl: 'Aufträge' }].map((s, i) => (
            <Card key={i} style={styles.statCard}><Ionicons name={s.icon} size={22} color={colors.accent.main} /><Text style={styles.statVal}>{s.val}</Text><Text style={styles.statLbl}>{s.lbl}</Text></Card>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Was benötigen Sie?</Text>
          <View style={styles.subGrid}>
            {subServices.map((sub, i) => (
              <TouchableOpacity key={i} style={styles.subCard} onPress={() => navigation.navigate('ProviderList', { service: sub.name })} activeOpacity={0.7}>
                <View style={[styles.subIconWrap, { backgroundColor: meta.color + '1A' }]}><Ionicons name={meta.icon} size={22} color={meta.color} /></View>
                <Text style={styles.subName}>{sub.name}</Text>
                {sub.urgent ? <View style={styles.urgentBadge}><Text style={styles.urgentText}>Notfall</Text></View> : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Häufige Fragen</Text>
          {faqs.map((faq, i) => (
            <Card key={i} style={styles.faqCard}>
              <TouchableOpacity style={styles.faqHeader} onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                <Text style={styles.faqQ}>{faq.q}</Text>
                <Ionicons name={expandedFaq === i ? 'chevron-up' : 'chevron-down'} size={20} color={colors.gray[500]} />
              </TouchableOpacity>
              {expandedFaq === i ? <Text style={styles.faqA}>{faq.a}</Text> : null}
            </Card>
          ))}
        </View>

        <Button onPress={() => navigation.navigate('ProviderList', { service: serviceName })} icon="arrow-forward" size="lg">
          Verfügbare Fachkräfte anzeigen
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  header: { paddingTop: 60, paddingBottom: spacing.xl, borderBottomLeftRadius: borderRadius.xl, borderBottomRightRadius: borderRadius.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: spacing.xl, marginBottom: spacing.lg },
  circleBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerBody: { alignItems: 'center', paddingHorizontal: spacing.xl },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  headerTitle: { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.white, marginBottom: spacing.xs },
  headerSubtitle: { fontSize: typography.fontSize.base, color: colors.white, opacity: 0.9 },
  content: { flex: 1 },
  scrollContent: { paddingBottom: spacing.xl },
  statsRow: { flexDirection: 'row', paddingHorizontal: spacing.xl, marginTop: spacing.lg, gap: spacing.sm, marginBottom: spacing.lg },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: spacing.md },
  statVal: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.gray[900], marginTop: 4 },
  statLbl: { fontSize: typography.fontSize.xs, color: colors.gray[500] },
  section: { paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  sectionTitle: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semiBold, color: colors.primary.main, marginBottom: spacing.md },
  subGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  subCard: { width: (width - spacing.xl * 2 - spacing.sm) / 2, backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, ...shadows.sm },
  subIconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  subName: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  urgentBadge: { backgroundColor: colors.status.error, borderRadius: 4, paddingHorizontal: spacing.xs, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 4 },
  urgentText: { fontSize: 10, fontWeight: typography.fontWeight.bold, color: colors.white },
  faqCard: { marginBottom: spacing.sm },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { flex: 1, fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  faqA: { fontSize: typography.fontSize.sm, color: colors.gray[600], marginTop: spacing.sm, lineHeight: 22 },
});

export default ServiceCategoryScreen;
