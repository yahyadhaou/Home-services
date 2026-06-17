import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Header } from '../../components/common';
import { colors, typography, spacing } from '../../constants/theme';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    pushNotifications: true, emailNotifications: true, smsNotifications: false,
    locationServices: true, darkMode: false, biometricLogin: true,
    marketingEmails: false, language: 'Deutsch',
  });
  const toggle = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));

  const Section = ({ title, children }) => (
    <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text><Card style={styles.sectionCard}>{children}</Card></View>
  );

  const ToggleRow = ({ icon, label, settingKey, isLast }) => (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.rowLeft}><View style={styles.iconWrap}><Ionicons name={icon} size={18} color={colors.accent.main} /></View><Text style={styles.rowLabel}>{label}</Text></View>
      <Switch value={settings[settingKey]} onValueChange={() => toggle(settingKey)} trackColor={{ false: colors.gray[300], true: colors.accent.light }} thumbColor={settings[settingKey] ? colors.accent.main : colors.gray[100]} />
    </View>
  );

  const LinkRow = ({ icon, label, value, isLast, onPress }) => (
    <TouchableOpacity style={[styles.row, !isLast && styles.rowBorder]} onPress={onPress}>
      <View style={styles.rowLeft}><View style={styles.iconWrap}><Ionicons name={icon} size={18} color={colors.accent.main} /></View><Text style={styles.rowLabel}>{label}</Text></View>
      <View style={styles.rowRight}>{value ? <Text style={styles.rowValue}>{value}</Text> : null}<Ionicons name="chevron-forward" size={16} color={colors.gray[400]} /></View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Einstellungen" onBackPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Section title="Benachrichtigungen">
          <ToggleRow icon="notifications" label="Push-Benachrichtigungen" settingKey="pushNotifications" />
          <ToggleRow icon="mail" label="E-Mail Benachrichtigungen" settingKey="emailNotifications" />
          <ToggleRow icon="chatbubble" label="SMS Benachrichtigungen" settingKey="smsNotifications" isLast />
        </Section>

        <Section title="Privatsphäre & Sicherheit">
          <ToggleRow icon="location" label="Standortdienste" settingKey="locationServices" />
          <ToggleRow icon="finger-print" label="Biometrische Anmeldung" settingKey="biometricLogin" isLast />
        </Section>

        <Section title="Erscheinungsbild">
          <ToggleRow icon="moon" label="Dunkler Modus" settingKey="darkMode" isLast />
        </Section>

        <Section title="Allgemein">
          <LinkRow icon="language" label="Sprache" value={settings.language} />
          <LinkRow icon="help-circle" label="Hilfe & Support" onPress={() => {}} />
          <LinkRow icon="document-text" label="Datenschutzerklärung" onPress={() => {}} />
          <LinkRow icon="shield" label="Nutzungsbedingungen" onPress={() => {}} isLast />
        </Section>

        <Section title="Marketing">
          <ToggleRow icon="megaphone" label="Marketing-E-Mails" settingKey="marketingEmails" isLast />
        </Section>

        <Text style={styles.version}>HomeServices v1.0.0  ·  © 2025</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  content: { padding: spacing.xl, paddingBottom: spacing['2xl'] },
  section: { marginBottom: spacing.xl },
  sectionTitle: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semiBold, color: colors.gray[500], marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionCard: { padding: 0, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.gray[100] },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  iconWrap: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.accent.main + '18', alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontSize: typography.fontSize.base, color: colors.gray[800] },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  rowValue: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  version: { textAlign: 'center', fontSize: typography.fontSize.xs, color: colors.gray[400] },
});

export default SettingsScreen;
