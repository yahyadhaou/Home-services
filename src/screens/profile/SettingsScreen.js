import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, LegalModal } from '../../components/common';
import { useLanguage, LANGUAGE_OPTIONS } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { t, language, setLanguage } = useLanguage();
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);

  const [settings, setSettings] = useState({
    pushNotifications: true, emailNotifications: true, smsNotifications: false,
    locationServices: true, biometricLogin: true, marketingEmails: false,
  });
  const [langModalOpen, setLangModalOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null); // null | 'terms' | 'privacy'
  const toggle = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));

  const currentLanguageLabel = LANGUAGE_OPTIONS.find((opt) => opt.code === language)?.native || 'English';

  const Section = ({ title, children }) => (
    <View style={styles.section}><Text style={styles.sectionTitle}>{title.toUpperCase()}</Text><View style={styles.sectionCard}>{children}</View></View>
  );

  const ToggleRow = ({ icon, label, value, onValueChange, isLast }) => (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.rowLeft}><Ionicons name={icon} size={16} color={d.line} /><Text style={styles.rowLabel}>{label}</Text></View>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: d.lineSoft, true: d.line }} thumbColor={d.panel} />
    </View>
  );

  const LinkRow = ({ icon, label, value, isLast, onPress }) => (
    <TouchableOpacity style={[styles.row, !isLast && styles.rowBorder]} onPress={onPress} activeOpacity={onPress ? 0.6 : 1}>
      <View style={styles.rowLeft}><Ionicons name={icon} size={16} color={d.line} /><Text style={styles.rowLabel}>{label}</Text></View>
      <View style={styles.rowRight}>{value ? <Text style={styles.rowValue}>{value}</Text> : null}<Ionicons name="chevron-forward" size={14} color={d.textSoft} /></View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={t('settings.title')} onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Section title={t('settings.notificationsSection')}>
          <ToggleRow icon="notifications-outline" label={t('settings.push')} value={settings.pushNotifications} onValueChange={() => toggle('pushNotifications')} />
          <ToggleRow icon="mail-outline" label={t('settings.emailNotif')} value={settings.emailNotifications} onValueChange={() => toggle('emailNotifications')} />
          {/* <ToggleRow icon="chatbubble-outline" label={t('settings.sms')} value={settings.smsNotifications} onValueChange={() => toggle('smsNotifications')} isLast /> */}
        </Section>

        <Section title={t('settings.privacySection')}>
          <ToggleRow icon="location-outline" label={t('settings.location')} value={settings.locationServices} onValueChange={() => toggle('locationServices')} />
          {/* <ToggleRow icon="finger-print-outline" label={t('settings.biometric')} value={settings.biometricLogin} onValueChange={() => toggle('biometricLogin')} isLast /> */}
        </Section>

        <Section title={t('settings.appearanceSection')}>
          <ToggleRow icon="moon-outline" label={t('settings.darkMode')} value={isDarkMode} onValueChange={toggleDarkMode} isLast />
        </Section>

        <Section title={t('settings.languageSection')}>
          <LinkRow icon="language-outline" label={t('settings.language')} value={currentLanguageLabel} onPress={() => setLangModalOpen(true)} isLast />
        </Section>

        <Section title={t('settings.generalSection')}>
          <LinkRow icon="help-circle-outline" label={t('settings.help')} onPress={() => navigation.navigate('HelpSupport')} />
          <LinkRow icon="document-text-outline" label={t('settings.privacyPolicy')} onPress={() => setLegalDoc('privacy')} />
          <LinkRow icon="shield-outline" label={t('settings.terms')} onPress={() => setLegalDoc('terms')} isLast />
        </Section>

        <Section title={t('settings.marketingSection')}>
          <ToggleRow icon="megaphone-outline" label={t('settings.marketingEmails')} value={settings.marketingEmails} onValueChange={() => toggle('marketingEmails')} isLast />
        </Section>

        <Text style={styles.version}>{t('settings.version')}  ·  © 2026</Text>
      </ScrollView>

      <Modal visible={langModalOpen} transparent animationType="fade" onRequestClose={() => setLangModalOpen(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setLangModalOpen(false)}>
          <View style={styles.modalSheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>{t('settings.language')}</Text>
            {LANGUAGE_OPTIONS.map((opt) => {
              const isActive = opt.code === language;
              return (
                <TouchableOpacity
                  key={opt.code}
                  style={[styles.modalOption, isActive && styles.modalOptionActive]}
                  onPress={() => { setLanguage(opt.code); setLangModalOpen(false); }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalFlag}>{opt.flag}</Text>
                  <View style={styles.modalOptionTextWrap}>
                    <Text style={[styles.modalOptionLabel, isActive && styles.modalOptionLabelActive]}>{opt.native}</Text>
                    <Text style={styles.modalOptionSub}>{opt.label}</Text>
                  </View>
                  {isActive ? <Ionicons name="checkmark-circle" size={20} color={d.line} /> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      <LegalModal visible={!!legalDoc} doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  content: { padding: 18, paddingBottom: 40 },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: d.textSoft, marginBottom: 8, letterSpacing: 0.5 },
  sectionCard: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 13 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  rowLabel: { fontSize: 13.5, color: d.text },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  rowValue: { fontSize: 12.5, color: d.textSoft },
  version: { textAlign: 'center', fontSize: 11, color: d.textSoft },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: d.panel, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderWidth: 1, borderColor: d.lineSoft, padding: 20, paddingBottom: 36 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: d.text, marginBottom: 14 },
  modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8, borderRadius: 10, marginBottom: 4 },
  modalOptionActive: { backgroundColor: d.canvas, borderWidth: 1, borderColor: d.line },
  modalFlag: { fontSize: 26, marginRight: 12 },
  modalOptionTextWrap: { flex: 1 },
  modalOptionLabel: { fontSize: 14, fontWeight: '700', color: d.text },
  modalOptionLabelActive: { color: d.line },
  modalOptionSub: { fontSize: 12, color: d.textSoft, marginTop: 1 },
});

export default SettingsScreen;
