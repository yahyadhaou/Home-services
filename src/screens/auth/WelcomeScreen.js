import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/common';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const WelcomeScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);

  const roles = [
    { icon: 'hammer-outline', label: t('welcome.carpenter'), code: '01' },
    { icon: 'flash-outline', label: t('welcome.electrician'), code: '02' },
    { icon: 'water-outline', label: t('welcome.plumber'), code: '03' },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.topSection, { paddingTop: insets.top + 16 }]}>
        <View style={styles.logoRow}>
          <View style={styles.logoBox}><Text style={styles.logoLetter}>H</Text></View>
          <View>
            <Text style={styles.brandText}>HomeServices</Text>
            <Text style={styles.tagline}>{t('welcome.tagline')}</Text>
          </View>
        </View>

        <View style={styles.tileRow}>
          {roles.map((r) => (
            <View key={r.code} style={styles.tile}>
              <View style={styles.tileTop}>
                <Ionicons name={r.icon} size={18} color={d.line} />
                <Text style={styles.tileCode}>{r.code}</Text>
              </View>
              <Text style={styles.tileLabel}>{r.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>

        <Button onPress={() => navigation.navigate('Login')} icon="arrow-forward" style={styles.btn}>{t('welcome.signIn')}</Button>
        <Button onPress={() => navigation.navigate('Register')} variant="outline" style={styles.btn}>{t('welcome.createAccount')}</Button>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} /><Text style={styles.dividerText}>{t('welcome.orContinueWith')}</Text><View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          {['logo-google', 'logo-apple', 'mail-outline'].map((icon, i) => (
            <View key={i} style={styles.socialBtn}><Ionicons name={icon} size={20} color={d.text} /></View>
          ))}
        </View>

        <Button onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} variant="ghost">{t('welcome.continueAsGuest')}</Button>
      </View>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container:      { flex: 1, backgroundColor: d.canvas },
  topSection:     { paddingTop: 60, paddingHorizontal: 22, paddingBottom: 26, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  logoRow:        { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 26 },
  logoBox:        { width: 52, height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: d.line, alignItems: 'center', justifyContent: 'center' },
  logoLetter:     { fontSize: 26, fontWeight: '700', color: d.line },
  brandText:      { fontSize: 18, fontWeight: '700', color: d.text },
  tagline:        { fontSize: 13, color: d.textSoft, marginTop: 1 },
  tileRow:        { flexDirection: 'row', gap: 10 },
  tile:           { flex: 1, backgroundColor: d.panel, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft, padding: 12 },
  tileTop:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  tileCode:       { fontSize: 9, letterSpacing: 0.4, color: d.line, fontFamily: MONO },
  tileLabel:      { fontSize: 11, fontWeight: '600', color: d.text },
  bottomSection:  { flex: 1, paddingHorizontal: 22, paddingTop: 26 },
  subtitle:       { fontSize: 14, color: d.textSoft, textAlign: 'center', marginBottom: 22 },
  btn:            { marginBottom: 12 },
  dividerRow:     { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
  dividerLine:    { flex: 1, height: 1, backgroundColor: d.lineSoft },
  dividerText:    { fontSize: 12, color: d.textSoft, marginHorizontal: 12 },
  socialRow:      { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 18 },
  socialBtn:      { width: 52, height: 52, borderRadius: 12, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
});

export default WelcomeScreen;
