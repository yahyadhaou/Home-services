import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Header } from '../../components/common';
import { isValidCardNumber, isValidIBAN } from '../../utils';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const TYPES = [
  { key: 'card',   label: 'Kredit-/Debitkarte', icon: 'card'        },
  { key: 'sepa',   label: 'SEPA Lastschrift',   icon: 'business'    },
  { key: 'paypal', label: 'PayPal',             icon: 'logo-paypal' },
];

const AddPaymentScreen = ({ navigation }) => {
  const [type, setType] = useState('card');
  const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', name: '', iban: '', email: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (v) => setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (type === 'card' && !isValidCardNumber(form.cardNumber)) e.cardNumber = 'Ungültige Kartennummer';
    if (type === 'sepa' && !isValidIBAN(form.iban)) e.iban = 'Ungültige IBAN (muss mit DE beginnen)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    Alert.alert('Hinzugefügt', 'Zahlungsmethode wurde gespeichert.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <View style={styles.container}>
      <Header title="Zahlungsmethode hinzufügen" onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Zahlungsart wählen</Text>
        <View style={styles.typePicker}>
          {TYPES.map((t) => (
            <TouchableOpacity key={t.key} style={[styles.typeCard, type === t.key && styles.typeCardActive]} onPress={() => setType(t.key)}>
              <Ionicons name={t.icon} size={26} color={type === t.key ? colors.white : colors.gray[600]} />
              <Text style={[styles.typeLabel, type === t.key && styles.typeLabelActive]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {type === 'card' ? (
          <View>
            <Text style={styles.sectionTitle}>Kartendaten</Text>
            <Input label="Karteninhaber" value={form.name} onChangeText={set('name')} icon="person-outline" placeholder="Max Mustermann" />
            <Input label="Kartennummer" value={form.cardNumber} onChangeText={set('cardNumber')} icon="card-outline" placeholder="1234 5678 9012 3456" keyboardType="number-pad" error={errors.cardNumber} />
            <View style={styles.row}>
              <View style={styles.half}><Input label="Ablaufdatum" value={form.expiry} onChangeText={set('expiry')} icon="calendar-outline" placeholder="MM/JJ" /></View>
              <View style={styles.half}><Input label="CVV" value={form.cvv} onChangeText={set('cvv')} icon="lock-closed-outline" placeholder="123" secureTextEntry keyboardType="number-pad" /></View>
            </View>
          </View>
        ) : null}

        {type === 'sepa' ? (
          <View>
            <Text style={styles.sectionTitle}>SEPA Daten</Text>
            <Input label="Kontoinhaber" value={form.name} onChangeText={set('name')} icon="person-outline" placeholder="Max Mustermann" />
            <Input label="IBAN" value={form.iban} onChangeText={set('iban')} icon="business-outline" placeholder="DE89 3704 0044 0532 0130 00" autoCapitalize="characters" error={errors.iban} />
          </View>
        ) : null}

        {type === 'paypal' ? (
          <View>
            <Text style={styles.sectionTitle}>PayPal Konto</Text>
            <Input label="PayPal E-Mail" value={form.email} onChangeText={set('email')} icon="mail-outline" placeholder="ihre.email@beispiel.de" keyboardType="email-address" autoCapitalize="none" />
          </View>
        ) : null}

        <View style={styles.secureRow}>
          <Ionicons name="shield-checkmark" size={16} color={colors.status.success} />
          <Text style={styles.secureText}>Ihre Daten werden sicher verschlüsselt übertragen (TLS 1.3)</Text>
        </View>

        <Button onPress={handleAdd} icon="checkmark">Hinzufügen</Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { padding: spacing.xl, paddingBottom: spacing['2xl'] },
  sectionTitle: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[700], marginBottom: spacing.md, marginTop: spacing.md },
  typePicker: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  typeCard: { flex: 1, backgroundColor: colors.gray[100], borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  typeCardActive: { backgroundColor: colors.accent.main, borderColor: colors.accent.main },
  typeLabel: { fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: colors.gray[600], marginTop: spacing.xs, textAlign: 'center' },
  typeLabelActive: { color: colors.white },
  row: { flexDirection: 'row', gap: spacing.sm },
  half: { flex: 1 },
  secureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.status.success + '10', borderRadius: borderRadius.sm, padding: spacing.sm, marginVertical: spacing.lg },
  secureText: { flex: 1, fontSize: typography.fontSize.xs, color: colors.gray[600] },
});

export default AddPaymentScreen;
