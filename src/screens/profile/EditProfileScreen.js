import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Header } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { isValidEmail, isValidPhone, isValidZip, getInitials } from '../../utils';
import { colors, typography, spacing } from '../../constants/theme';

const EditProfileScreen = ({ navigation }) => {
  const { user } = useApp();
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '',
    street: 'Musterstraße 1', city: 'Essen', zip: '45127',
  });
  const [errors, setErrors] = useState({});
  const set = (key) => (val) => setForm((p) => ({ ...p, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name ist erforderlich';
    if (!isValidEmail(form.email)) e.email = 'Gültige E-Mail erforderlich';
    if (!isValidPhone(form.phone)) e.phone = 'Gültige Telefonnummer erforderlich';
    if (!isValidZip(form.zip)) e.zip = 'PLZ muss 5 Ziffern haben';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    Alert.alert('Gespeichert', 'Ihre Daten wurden aktualisiert.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <View style={styles.container}>
      <Header title="Profil bearbeiten" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{getInitials(form.name || 'Gast')}</Text></View>
          <TouchableOpacity style={styles.changeAvatarBtn}><Ionicons name="camera" size={16} color={colors.white} /></TouchableOpacity>
          <Text style={styles.avatarHint}>Foto ändern</Text>
        </View>

        <Text style={styles.sectionLabel}>Persönliche Daten</Text>
        <Input label="Vollständiger Name" value={form.name} onChangeText={set('name')} icon="person-outline" placeholder="Max Mustermann" error={errors.name} />
        <Input label="E-Mail" value={form.email} onChangeText={set('email')} icon="mail-outline" placeholder="email@beispiel.de" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Input label="Telefon" value={form.phone} onChangeText={set('phone')} icon="call-outline" placeholder="+49 123 456 7890" keyboardType="phone-pad" error={errors.phone} />

        <Text style={styles.sectionLabel}>Adresse</Text>
        <Input label="Straße & Hausnummer" value={form.street} onChangeText={set('street')} icon="home-outline" placeholder="Musterstraße 1" />
        <Input label="Stadt" value={form.city} onChangeText={set('city')} icon="business-outline" placeholder="Essen" />
        <Input label="PLZ" value={form.zip} onChangeText={set('zip')} icon="mail-open-outline" placeholder="45127" keyboardType="number-pad" error={errors.zip} />

        <Button onPress={handleSave} icon="checkmark" style={styles.saveBtn}>Änderungen speichern</Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: spacing.xl, paddingBottom: spacing['2xl'] },
  avatarSection: { alignItems: 'center', marginBottom: spacing.xl, position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.accent.main, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 36, fontWeight: typography.fontWeight.bold, color: colors.white },
  changeAvatarBtn: { position: 'absolute', bottom: 18, right: '30%', width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary.main, alignItems: 'center', justifyContent: 'center' },
  avatarHint: { fontSize: typography.fontSize.sm, color: colors.accent.main, marginTop: spacing.xs },
  sectionLabel: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[700], marginBottom: spacing.sm, marginTop: spacing.md },
  saveBtn: { marginTop: spacing.lg },
});

export default EditProfileScreen;
