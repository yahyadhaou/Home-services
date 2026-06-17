import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input, Header } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { isValidEmail } from '../../utils';
import { colors, typography, spacing } from '../../constants/theme';

const LoginScreen = ({ navigation }) => {
  const { login } = useApp();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim())           e.email = 'E-Mail ist erforderlich';
    else if (!isValidEmail(email)) e.email = 'Ungültige E-Mail-Adresse';
    if (!password.trim())        e.password = 'Passwort ist erforderlich';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) navigation.replace('Home');
    else setErrors({ general: 'Anmeldung fehlgeschlagen. Bitte prüfen Sie Ihre Daten.' });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header title="Anmelden" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Willkommen zurück</Text>
        <Text style={styles.subheading}>Melden Sie sich an, um fortzufahren</Text>

        {errors.general ? <Text style={styles.generalError}>{errors.general}</Text> : null}

        <Input label="E-Mail" placeholder="ihre.email@beispiel.de" value={email} onChangeText={setEmail}
          icon="mail-outline" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Input label="Passwort" placeholder="••••••••" value={password} onChangeText={setPassword}
          icon="lock-closed-outline" secureTextEntry showPasswordToggle error={errors.password} />

        <TouchableOpacity style={styles.forgotRow}><Text style={styles.forgotText}>Passwort vergessen?</Text></TouchableOpacity>

        <Button onPress={handleLogin} loading={loading} icon="arrow-forward" size="lg">Anmelden</Button>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Noch kein Konto? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.signupLink}>Registrieren</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: colors.white },
  content:       { padding: spacing.xl, paddingBottom: spacing['2xl'] },
  heading:       { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.primary.main, marginBottom: spacing.xs },
  subheading:    { fontSize: typography.fontSize.base, color: colors.gray[600], marginBottom: spacing.xl },
  generalError:  { backgroundColor: '#FEE2E2', color: colors.status.error, borderRadius: 8, padding: spacing.sm, marginBottom: spacing.md, fontSize: typography.fontSize.sm },
  forgotRow:     { alignSelf: 'flex-end', marginBottom: spacing.xl },
  forgotText:    { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.accent.main },
  signupRow:     { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  signupText:    { fontSize: typography.fontSize.base, color: colors.gray[600] },
  signupLink:    { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.accent.main },
});

export default LoginScreen;
