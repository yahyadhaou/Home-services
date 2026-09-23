import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Header } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { splitName } from '../../services/authService';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';
import { isValidEmail, isValidPhone, isValidZip, getInitials } from '../../utils';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateProfile } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    // Street/city/zip aren't part of the user profile on the backend (that's
    // a separate saved-addresses concept — see SavedAddressesScreen) — kept
    // as local-only fields here for now, same as before this screen was wired up.
    street: 'Musterstraße 1', city: 'Essen', zip: '45127',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())          e.name = t('editProfile.nameRequired');
    if (!isValidEmail(form.email))  e.email = t('editProfile.emailInvalid');
    if (!isValidPhone(form.phone))  e.phone = t('editProfile.phoneInvalid');
    if (!isValidZip(form.zip))      e.zip = t('editProfile.zipInvalid');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    const { firstName, lastName } = splitName(form.name);
    const result = await updateProfile({
      firstName, lastName, email: form.email, phone: form.phone,
    });
    setSaving(false);
    if (result.success) {
      Alert.alert(t('editProfile.savedTitle'), t('editProfile.savedBody'), [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } else {
      setErrors((prev) => ({ ...prev, general: result.error || t('editProfile.saveFailed') }));
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t('editProfile.title')} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{getInitials(form.name || t('profile.guest'))}</Text></View>
          <TouchableOpacity style={styles.changeAvatarBtn}><Ionicons name="camera-outline" size={14} color={d.canvas} /></TouchableOpacity>
          <Text style={styles.avatarHint}>{t('editProfile.changePhoto')}</Text>
        </View>

        {errors.general ? <Text style={styles.generalError}>{errors.general}</Text> : null}

        <Text style={styles.sectionLabel}>{t('editProfile.personalData')}</Text>
        <Input label={t('editProfile.fullName')} value={form.name} onChangeText={set('name')} icon="person-outline" placeholder="Max Mustermann" error={errors.name} />
        <Input label={t('editProfile.email')} value={form.email} onChangeText={set('email')} icon="mail-outline" placeholder="email@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Input label={t('editProfile.phone')} value={form.phone} onChangeText={set('phone')} icon="call-outline" placeholder="+49 123 456 7890" keyboardType="phone-pad" error={errors.phone} />

        <Text style={styles.sectionLabel}>{t('editProfile.address')}</Text>
        <Input label={t('editProfile.street')} value={form.street} onChangeText={set('street')} icon="home-outline" placeholder="Musterstraße 1" />
        <Input label={t('editProfile.city')} value={form.city} onChangeText={set('city')} icon="business-outline" placeholder="Essen" />
        <Input label={t('editProfile.zip')} value={form.zip} onChangeText={set('zip')} icon="mail-open-outline" placeholder="45127" keyboardType="number-pad" error={errors.zip} />

        <Button onPress={handleSave} loading={saving} icon="checkmark" style={styles.saveBtn}>{t('editProfile.saveButton')}</Button>
      </ScrollView>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  content: { padding: 18, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', marginBottom: 20, position: 'relative' },
  avatar: { width: 84, height: 84, borderRadius: 20, borderWidth: 1.5, borderColor: d.line, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 30, fontWeight: '700', color: d.line },
  changeAvatarBtn: { position: 'absolute', bottom: 18, right: '30%', width: 28, height: 28, borderRadius: 14, backgroundColor: d.line, alignItems: 'center', justifyContent: 'center' },
  avatarHint: { fontSize: 12, color: d.line, marginTop: 8 },
  generalError: { backgroundColor: d.dangerSoft, color: d.danger, borderRadius: 8, padding: 10, marginBottom: 14, fontSize: 12 },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: d.text, marginBottom: 10, marginTop: 10 },
  saveBtn: { marginTop: 10 },
});

export default EditProfileScreen;
