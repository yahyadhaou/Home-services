import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/common';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const SERVICE_META = {
  plumber:     { icon: 'water-outline',         code: '01/PLB' },
  electrician: { icon: 'flash-outline',         code: '02/ELC' },
  cleaning:    { icon: 'sparkles-outline',      code: '03/CLN' },
  heating:     { icon: 'thermometer-outline',   code: '04/HVC' },
  carpenter:   { icon: 'hammer-outline',        code: '05/CRP' },
  painter:     { icon: 'color-palette-outline', code: '06/PNT' },
  gardener:    { icon: 'leaf-outline',          code: '07/GRD' },
  moving:      { icon: 'car-outline',           code: '08/MOV' },
};

const resolveServiceCode = (displayName, t) => {
  const codes = Object.keys(SERVICE_META);
  const match = codes.find((code) => t(`home.${code}`) === displayName);
  return match || 'plumber';
};

const ServiceCategoryScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);

  const serviceDisplayName = route.params?.service || t('home.plumber');
  const serviceCode = resolveServiceCode(serviceDisplayName, t);
  const meta = SERVICE_META[serviceCode];
  const [expandedFaq, setExpandedFaq] = useState(null);

  const subServices = t(`serviceCategory.subServices.${serviceCode}`) || [];
  const faqs = t(`serviceCategory.faqs.${serviceCode}`) || [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 12 }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={16} color={d.text} /></TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn}><Ionicons name="heart-outline" size={16} color={d.text} /></TouchableOpacity>
        </View>
        <View style={styles.headerBody}>
          <View style={styles.iconWrap}>
            <Ionicons name={meta.icon} size={36} color={d.line} />
            <Text style={styles.iconCode}>{meta.code}</Text>
          </View>
          <Text style={styles.headerTitle}>{serviceDisplayName}</Text>
          <Text style={styles.headerSubtitle}>12 {t('serviceCategory.available')}</Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { icon: 'star-outline', val: '4.8',  lbl: t('serviceCategory.rating') },
            { icon: 'time-outline', val: '1-2H', lbl: t('serviceCategory.arrival') },
            { icon: 'people-outline', val: '850+', lbl: t('serviceCategory.jobs') },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Ionicons name={s.icon} size={16} color={d.line} />
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.lbl.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('serviceCategory.whatDoYouNeed')}</Text>
          <View style={styles.subGrid}>
            {subServices.map((sub, i) => (
              <TouchableOpacity key={i} style={styles.subCard} onPress={() => navigation.navigate('ProviderList', { service: serviceDisplayName })} activeOpacity={0.75}>
                <Ionicons name={sub.icon} size={20} color={d.line} />
                <Text style={styles.subName} numberOfLines={2}>{sub.name}</Text>
                {sub.urgent ? <View style={styles.urgentBadge}><Text style={styles.urgentText}>{t('serviceCategory.emergency').toUpperCase()}</Text></View> : null}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('serviceCategory.faq')}</Text>
          {faqs.map((faq, i) => (
            <View key={i} style={styles.faqCard}>
              <TouchableOpacity style={styles.faqHeader} onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}>
                <Text style={styles.faqQ}>{faq.q}</Text>
                <Ionicons name={expandedFaq === i ? 'chevron-up' : 'chevron-down'} size={16} color={d.line} />
              </TouchableOpacity>
              {expandedFaq === i ? <Text style={styles.faqA}>{faq.a}</Text> : null}
            </View>
          ))}
        </View>

        <Button onPress={() => navigation.navigate('ProviderList', { service: serviceDisplayName })} icon="arrow-forward" size="lg">
          {t('serviceCategory.viewProviders')}
        </Button>
      </ScrollView>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  scrollContent: { padding: 18, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  circleBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  headerBody: { alignItems: 'center', marginBottom: 20 },
  iconWrap: { width: 84, height: 84, borderRadius: 18, borderWidth: 1.5, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center', marginBottom: 12, gap: 4 },
  iconCode: { fontSize: 9, letterSpacing: 0.4, color: d.line, fontFamily: MONO },
  headerTitle: { fontSize: 22, fontWeight: '700', color: d.text, marginBottom: 2 },
  headerSubtitle: { fontSize: 13, color: d.textSoft },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14, backgroundColor: d.panel, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft },
  statVal: { fontSize: 15, fontWeight: '700', color: d.text, marginTop: 4, fontFamily: MONO },
  statLbl: { fontSize: 9, color: d.textSoft, marginTop: 1, fontFamily: MONO },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: d.text, marginBottom: 12 },
  subGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  subCard: { width: '48.5%', backgroundColor: d.panel, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft, padding: 12, minHeight: 96, justifyContent: 'space-between' },
  subName: { fontSize: 12.5, fontWeight: '600', color: d.text, marginTop: 8 },
  urgentBadge: { backgroundColor: d.dangerSoft, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', marginTop: 6 },
  urgentText: { fontSize: 9, fontWeight: '700', color: d.danger, fontFamily: MONO },
  faqCard: { backgroundColor: d.panel, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, padding: 13, marginBottom: 8 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { flex: 1, fontSize: 13, fontWeight: '600', color: d.text },
  faqA: { fontSize: 12.5, color: d.textSoft, marginTop: 10, lineHeight: 19 },
});

export default ServiceCategoryScreen;
