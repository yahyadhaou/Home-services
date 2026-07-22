import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const FAQ_KEYS = ['faq1', 'faq2', 'faq3', 'faq4'];

const HelpSupportScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const [openFaq, setOpenFaq] = useState(null);

  const contactOptions = [
    { icon: 'chatbubble-outline', label: t('helpSupport.liveChat'), action: () => navigation.navigate('MainTabs', { screen: 'Chat' }) },
    { icon: 'mail-outline', label: t('helpSupport.email'), action: () => Linking.openURL('mailto:support@homeservices.app').catch(() => {}) },
    { icon: 'call-outline', label: t('helpSupport.callUs'), action: () => Linking.openURL('tel:080012345').catch(() => {}) },
  ];

  return (
    <View style={[styles.container, { backgroundColor: d.canvas }]}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <TouchableOpacity style={[styles.back, { borderColor: d.lineSoft }]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={16} color={d.text} />
          </TouchableOpacity>
          <Text style={[styles.headTitle, { color: d.text }]}>{t('helpSupport.title')}</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: d.text }]}>{t('helpSupport.faqTitle')}</Text>
        <View style={[styles.faqCard, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          {FAQ_KEYS.map((key, i) => {
            const open = openFaq === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.faqRow, i < FAQ_KEYS.length - 1 && { borderBottomWidth: 1, borderBottomColor: d.lineSoft }]}
                onPress={() => setOpenFaq(open ? null : key)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHead}>
                  <Text style={[styles.faqQ, { color: d.text }]}>{t(`helpSupport.${key}Q`)}</Text>
                  <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={14} color={d.line} />
                </View>
                {open ? <Text style={[styles.faqA, { color: d.textSoft }]}>{t(`helpSupport.${key}A`)}</Text> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, { color: d.text }]}>{t('helpSupport.contactTitle')}</Text>
        <View style={[styles.contactCard, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
          {contactOptions.map((o, i) => (
            <TouchableOpacity
              key={o.label}
              style={[styles.contactRow, i < contactOptions.length - 1 && { borderBottomWidth: 1, borderBottomColor: d.lineSoft }]}
              onPress={o.action}
            >
              <Ionicons name={o.icon} size={16} color={d.line} />
              <Text style={[styles.contactLabel, { color: d.text }]}>{o.label}</Text>
              <Ionicons name="chevron-forward" size={14} color={d.textSoft} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[styles.disputeBtn, { borderColor: d.danger }]}>
          <Ionicons name="flag-outline" size={15} color={d.danger} />
          <Text style={[styles.disputeText, { color: d.danger }]}>{t('helpSupport.reportIssue')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 18, paddingBottom: 32, paddingTop: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 },
  back: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headTitle: { fontSize: 16, fontWeight: '700' },

  sectionTitle: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 4 },
  faqCard: { borderWidth: 1, borderRadius: 12, marginBottom: 20, overflow: 'hidden' },
  faqRow: { padding: 13 },
  faqHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  faqQ: { flex: 1, fontSize: 12.5, fontWeight: '600' },
  faqA: { fontSize: 12, lineHeight: 18, marginTop: 8 },

  contactCard: { borderWidth: 1, borderRadius: 12, marginBottom: 18, overflow: 'hidden' },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 13 },
  contactLabel: { flex: 1, fontSize: 12.5, fontWeight: '500' },

  disputeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderRadius: 12, padding: 13 },
  disputeText: { fontSize: 13, fontWeight: '600' },
});

export default HelpSupportScreen;
