import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Input, Header } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { isValidEmail, isValidPhone, isStrongPassword } from '../../utils';
import { colors, typography, spacing } from '../../constants/theme';

const RegisterScreen = ({ navigation }) => {
  const { register } = useApp();
  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed]   = useState(false);

  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())   e.name = 'Name ist erforderlich';
    if (!isValidEmail(form.email)) e.email = 'Gültige E-Mail erforderlich';
    if (!isValidPhone(form.phone)) e.phone = 'Gültige Telefonnummer erforderlich';
    if (!isStrongPassword(form.password)) e.password = 'Mind. 8 Zeichen, mit Buchstaben und Zahl';
    if (!agreed) e.terms = 'Bitte Bedingungen akzeptieren';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header title="Konto erstellen" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Neu hier?</Text>
        <Text style={styles.subheading}>Erstellen Sie jetzt Ihr kostenloses Konto</Text>

        <Input label="Name" placeholder="Max Mustermann" value={form.name} onChangeText={set('name')} icon="person-outline" error={errors.name} />
        <Input label="E-Mail" placeholder="ihre.email@beispiel.de" value={form.email} onChangeText={set('email')} icon="mail-outline" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Input label="Telefon" placeholder="+49 123 456 7890" value={form.phone} onChangeText={set('phone')} icon="call-outline" keyboardType="phone-pad" error={errors.phone} />
        <Input label="Passwort" placeholder="Mindestens 8 Zeichen" value={form.password} onChangeText={set('password')} icon="lock-closed-outline" secureTextEntry showPasswordToggle error={errors.password} />

        <TouchableOpacity style={styles.checkRow} onPress={() => setAgreed(!agreed)}>
          <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
            {agreed ? <Text style={styles.checkmark}>✓</Text> : null}
          </View>
          <Text style={styles.checkText}>
            Ich stimme den <Text style={styles.link}>Nutzungsbedingungen</Text> und der{' '}
            <Text style={styles.link}>Datenschutzerklärung</Text> zu
          </Text>
        </TouchableOpacity>
        {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

        <Button onPress={handleRegister} loading={loading} disabled={!agreed} icon="arrow-forward" size="lg" style={styles.btn}>
          Registrieren
        </Button>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Haben Sie bereits ein Konto? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.loginLink}>Anmelden</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: colors.white },
  content:        { padding: spacing.xl, paddingBottom: spacing['2xl'] },
  heading:        { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.primary.main, marginBottom: spacing.xs },
  subheading:     { fontSize: typography.fontSize.base, color: colors.gray[600], marginBottom: spacing.xl },
  checkRow:       { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.md },
  checkbox:       { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: colors.gray[300], alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm, marginTop: 1 },
  checkboxActive: { backgroundColor: colors.accent.main, borderColor: colors.accent.main },
  checkmark:      { color: colors.white, fontWeight: typography.fontWeight.bold, fontSize: 14 },
  checkText:      { flex: 1, fontSize: typography.fontSize.sm, color: colors.gray[600], lineHeight: 20 },
  link:           { color: colors.accent.main, fontWeight: typography.fontWeight.medium },
  errorText:      { fontSize: typography.fontSize.sm, color: colors.status.error, marginBottom: spacing.md },
  btn:            { marginTop: spacing.sm },
  loginRow:       { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl },
  loginText:      { fontSize: typography.fontSize.base, color: colors.gray[600] },
  loginLink:      { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.accent.main },
});

export default RegisterScreen;
