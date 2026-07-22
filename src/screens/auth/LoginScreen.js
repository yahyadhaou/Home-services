import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';
import { isValidEmail } from '../../utils';

const LoginScreen = ({ navigation }) => {
  const { login } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim())             e.email = t('login.emailRequired');
    else if (!isValidEmail(email)) e.email = t('login.emailInvalid');
    if (!password.trim())          e.password = t('login.passwordRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) navigation.replace('MainTabs', { screen: 'Home' });
    else setErrors({ general: t('login.loginFailed') });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={d.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('login.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>{t('login.heading')}</Text>
        <Text style={styles.subheading}>{t('login.subheading')}</Text>

        {errors.general ? <Text style={styles.generalError}>{errors.general}</Text> : null}

        <Input label={t('login.email')} placeholder={t('login.emailPlaceholder')} value={email} onChangeText={setEmail}
          icon="mail-outline" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Input label={t('login.password')} placeholder={t('login.passwordPlaceholder')} value={password} onChangeText={setPassword}
          icon="lock-closed-outline" secureTextEntry showPasswordToggle error={errors.password} />

        <TouchableOpacity style={styles.forgotRow}><Text style={styles.forgotText}>{t('login.forgotPassword')}</Text></TouchableOpacity>

        <Button onPress={handleLogin} loading={loading} icon="arrow-forward" size="lg">{t('login.signInButton')}</Button>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>{t('login.noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.signupLink}>{t('login.register')}</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const createStyles = (d) => StyleSheet.create({
  container:     { flex: 1, backgroundColor: d.canvas },
  header:        { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20 },
  backBtn:       { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  headerTitle:   { fontSize: 17, fontWeight: '700', color: d.text },
  content:       { padding: 20, paddingBottom: 40 },
  heading:       { fontSize: 20, fontWeight: '700', color: d.text, marginBottom: 4 },
  subheading:    { fontSize: 13, color: d.textSoft, marginBottom: 22 },
  generalError:  { backgroundColor: d.dangerSoft, color: d.danger, borderRadius: 8, padding: 10, marginBottom: 14, fontSize: 12 },
  forgotRow:     { alignSelf: 'flex-end', marginBottom: 22 },
  forgotText:    { fontSize: 12, fontWeight: '600', color: d.line },
  signupRow:     { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  signupText:    { fontSize: 13, color: d.textSoft },
  signupLink:    { fontSize: 13, fontWeight: '700', color: d.line },
});

export default LoginScreen;
