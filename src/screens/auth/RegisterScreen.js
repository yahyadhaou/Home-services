import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input, LegalModal } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';
import { isValidEmail, isValidPhone, isStrongPassword } from '../../utils';

const RegisterScreen = ({ navigation }) => {
  const { register } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed]   = useState(false);
  const [legalDoc, setLegalDoc] = useState(null); // null | 'terms' | 'privacy'

  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name = t('register.nameRequired');
    if (!isValidEmail(form.email)) e.email = t('register.emailInvalid');
    if (!isValidPhone(form.phone)) e.phone = t('register.phoneInvalid');
    if (!isStrongPassword(form.password)) e.password = t('register.passwordWeak');
    if (!agreed) e.terms = t('register.termsRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) navigation.replace('MainTabs', { screen: 'Home' });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={d.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('register.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{t('register.heading')}</Text>
        <Text style={styles.subheading}>{t('register.subheading')}</Text>

        <Input label={t('register.name')} placeholder={t('register.namePlaceholder')} value={form.name} onChangeText={set('name')} icon="person-outline" error={errors.name} />
        <Input label={t('register.email')} placeholder={t('register.emailPlaceholder')} value={form.email} onChangeText={set('email')} icon="mail-outline" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Input label={t('register.phone')} placeholder={t('register.phonePlaceholder')} value={form.phone} onChangeText={set('phone')} icon="call-outline" keyboardType="phone-pad" error={errors.phone} />
        <Input label={t('register.password')} placeholder={t('register.passwordPlaceholder')} value={form.password} onChangeText={set('password')} icon="lock-closed-outline" secureTextEntry showPasswordToggle error={errors.password} />

        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed ? <Ionicons name="checkmark" size={13} color={d.canvas} /> : null}
          </View>
          <Text style={styles.checkText}>
            {t('register.agreeTerms')}<Text style={styles.link} onPress={() => setLegalDoc('terms')}>{t('register.termsLink')}</Text>{t('register.and')}<Text style={styles.link} onPress={() => setLegalDoc('privacy')}>{t('register.privacyLink')}</Text>
          </Text>
        </TouchableOpacity>
        {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

        <Button onPress={handleRegister} loading={loading} disabled={!agreed} icon="arrow-forward" size="lg" style={styles.btn}>
          {t('register.registerButton')}
        </Button>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>{t('register.haveAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.loginLink}>{t('register.signIn')}</Text></TouchableOpacity>
        </View>
      </ScrollView>

      <LegalModal visible={!!legalDoc} doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </KeyboardAvoidingView>
  );
};

const createStyles = (d) => StyleSheet.create({
  container:      { flex: 1, backgroundColor: d.canvas },
  header:         { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20 },
  backBtn:        { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  headerTitle:    { fontSize: 17, fontWeight: '700', color: d.text },
  content:        { padding: 20, paddingBottom: 40 },
  heading:        { fontSize: 20, fontWeight: '700', color: d.text, marginBottom: 4 },
  subheading:     { fontSize: 13, color: d.textSoft, marginBottom: 22 },
  checkRow:       { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  checkbox:       { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginRight: 10, marginTop: 1 },
  checkboxActive: { backgroundColor: d.line, borderColor: d.line },
  checkText:      { flex: 1, fontSize: 12.5, color: d.textSoft, lineHeight: 19 },
  link:           { color: d.line, fontWeight: '600' },
  errorText:      { fontSize: 12, color: d.danger, marginBottom: 14 },
  btn:            { marginTop: 6 },
  loginRow:       { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  loginText:      { fontSize: 13, color: d.textSoft },
  loginLink:      { fontSize: 13, fontWeight: '700', color: d.line },
});

export default RegisterScreen;
