import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Header, Badge } from '../../components/common';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const INITIAL = [
  { id: '1', type: 'visa',   last4: '4242', expires: '12/26', isDefault: true  },
  { id: '2', type: 'sepa',   iban: 'DE89 3704 0044', isDefault: false },
  { id: '3', type: 'paypal', email: 'max@example.com', isDefault: false },
];

const CARD_ICONS = { visa: 'card-outline', mastercard: 'card-outline', sepa: 'business-outline', paypal: 'logo-paypal' };

const PaymentMethodsScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const [methods, setMethods] = useState(INITIAL);

  const CARD_LABELS = { visa: 'Visa', mastercard: 'Mastercard', sepa: t('providerDetail.sepa'), paypal: 'PayPal' };

  const setDefault = (id) => setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  const remove = (id) => Alert.alert(t('paymentMethods.removeTitle'), t('paymentMethods.removeBody'), [
    { text: t('paymentMethods.cancel'), style: 'cancel' },
    { text: t('paymentMethods.remove'), style: 'destructive', onPress: () => setMethods((p) => p.filter((m) => m.id !== id)) },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.iconWrap}><Ionicons name={CARD_ICONS[item.type] || 'card-outline'} size={20} color={d.line} /></View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardType}>{CARD_LABELS[item.type] || item.type}</Text>
          <Text style={styles.cardSub}>{item.last4 ? `•••• ${item.last4}  ·  ${item.expires}` : item.iban || item.email}</Text>
        </View>
        {item.isDefault ? <Badge label={t('paymentMethods.default')} color={d.green} /> : null}
      </View>

      <View style={styles.actions}>
        {!item.isDefault ? (
          <TouchableOpacity style={styles.actionBtn} onPress={() => setDefault(item.id)}>
            <Ionicons name="checkmark-circle-outline" size={15} color={d.green} />
            <Text style={[styles.actionText, { color: d.green }]}>{t('paymentMethods.setDefault')}</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.actionBtn} onPress={() => remove(item.id)}>
          <Ionicons name="trash-outline" size={15} color={d.danger} />
          <Text style={[styles.actionText, { color: d.danger }]}>{t('paymentMethods.remove')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={t('paymentMethods.title')} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={methods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Button onPress={() => navigation.navigate('AddPayment')} variant="outline" icon="add" iconPosition="left">{t('paymentMethods.addButton')}</Button>}
      />
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  list: { padding: 18 },
  card: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 14, marginBottom: 12 },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconWrap: { width: 42, height: 42, borderRadius: 11, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  cardInfo: { flex: 1 },
  cardType: { fontSize: 13.5, fontWeight: '700', color: d.text },
  cardSub: { fontSize: 12, color: d.textSoft, marginTop: 2 },
  actions: { flexDirection: 'row', gap: 16, borderTopWidth: 1, borderTopColor: d.lineSoft, paddingTop: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: 12, fontWeight: '600' },
});

export default PaymentMethodsScreen;
