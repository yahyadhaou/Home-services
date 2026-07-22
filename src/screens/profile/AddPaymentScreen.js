import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, Header } from '../../components/common';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';
import { isValidCardNumber, isValidIBAN } from '../../utils';

const AddPaymentScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const [type, setType] = useState('card');
  const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', name: '', iban: '', email: '' });
  const [errors, setErrors] = useState({});
  const set = (k) => (v) => setForm((p) => ({ ...p, [k]: v }));

  const TYPES = [
    { key: 'card',   label: t('addPayment.card'),   icon: 'card-outline'        },
    { key: 'sepa',   label: t('addPayment.sepa'),   icon: 'business-outline'    },
    { key: 'paypal', label: t('addPayment.paypal'), icon: 'logo-paypal' },
  ];

  const validate = () => {
    const e = {};
    if (type === 'card' && !isValidCardNumber(form.cardNumber)) e.cardNumber = t('addPayment.cardInvalid');
    if (type === 'sepa' && !isValidIBAN(form.iban)) e.iban = t('addPayment.ibanInvalid');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    Alert.alert(t('addPayment.addedTitle'), t('addPayment.addedBody'), [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <View style={styles.container}>
      <Header title={t('addPayment.title')} onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{t('addPayment.selectType')}</Text>
        <View style={styles.typePicker}>
          {TYPES.map((opt) => (
            <TouchableOpacity key={opt.key} style={[styles.typeCard, type === opt.key && styles.typeCardActive]} onPress={() => setType(opt.key)}>
              <Ionicons name={opt.icon} size={22} color={type === opt.key ? d.canvas : d.textSoft} />
              <Text style={[styles.typeLabel, type === opt.key && styles.typeLabelActive]}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {type === 'card' ? (
          <View>
            <Text style={styles.sectionTitle}>{t('addPayment.cardData')}</Text>
            <Input label={t('addPayment.cardHolder')} value={form.name} onChangeText={set('name')} icon="person-outline" placeholder={t('addPayment.cardHolderPlaceholder')} />
            <Input label={t('addPayment.cardNumber')} value={form.cardNumber} onChangeText={set('cardNumber')} icon="card-outline" placeholder="1234 5678 9012 3456" keyboardType="number-pad" error={errors.cardNumber} />
            <View style={styles.row}>
              <View style={styles.half}><Input label={t('addPayment.expiry')} value={form.expiry} onChangeText={set('expiry')} icon="calendar-outline" placeholder="MM/YY" /></View>
              <View style={styles.half}><Input label={t('addPayment.cvv')} value={form.cvv} onChangeText={set('cvv')} icon="lock-closed-outline" placeholder="123" secureTextEntry keyboardType="number-pad" /></View>
            </View>
          </View>
        ) : null}

        {type === 'sepa' ? (
          <View>
            <Text style={styles.sectionTitle}>{t('addPayment.sepaData')}</Text>
            <Input label={t('addPayment.accountHolder')} value={form.name} onChangeText={set('name')} icon="person-outline" placeholder="Max Mustermann" />
            <Input label={t('addPayment.iban')} value={form.iban} onChangeText={set('iban')} icon="business-outline" placeholder="DE89 3704 0044 0532 0130 00" autoCapitalize="characters" error={errors.iban} />
          </View>
        ) : null}

        {type === 'paypal' ? (
          <View>
            <Text style={styles.sectionTitle}>{t('addPayment.paypalAccount')}</Text>
            <Input label={t('addPayment.paypalEmail')} value={form.email} onChangeText={set('email')} icon="mail-outline" placeholder="your.email@example.com" keyboardType="email-address" autoCapitalize="none" />
          </View>
        ) : null}

        <View style={styles.secureRow}>
          <Ionicons name="shield-checkmark-outline" size={15} color={d.green} />
          <Text style={styles.secureText}>{t('addPayment.secureText')}</Text>
        </View>

        <Button onPress={handleAdd} icon="checkmark">{t('addPayment.addButton')}</Button>
      </ScrollView>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  content: { padding: 18, paddingBottom: 40 },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: d.text, marginBottom: 12, marginTop: 10 },
  typePicker: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  typeCard: { flex: 1, backgroundColor: d.panel, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: d.lineSoft },
  typeCardActive: { backgroundColor: d.line, borderColor: d.line },
  typeLabel: { fontSize: 10.5, fontWeight: '600', color: d.textSoft, marginTop: 6, textAlign: 'center' },
  typeLabelActive: { color: d.canvas },
  row: { flexDirection: 'row', gap: 8 },
  half: { flex: 1 },
  secureRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, padding: 10, marginVertical: 18 },
  secureText: { flex: 1, fontSize: 11, color: d.textSoft },
});

export default AddPaymentScreen;
