import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Button, Header, Badge } from '../../components/common';
import { colors, typography, spacing } from '../../constants/theme';

const INITIAL = [
  { id: '1', type: 'visa',   last4: '4242', expires: '12/26', isDefault: true  },
  { id: '2', type: 'sepa',   iban: 'DE89 3704 0044', isDefault: false },
  { id: '3', type: 'paypal', email: 'max@beispiel.de', isDefault: false },
];

const CARD_ICONS  = { visa: 'card', mastercard: 'card', sepa: 'business', paypal: 'logo-paypal' };
const CARD_LABELS = { visa: 'Visa', mastercard: 'Mastercard', sepa: 'SEPA Lastschrift', paypal: 'PayPal' };

const PaymentMethodsScreen = ({ navigation }) => {
  const [methods, setMethods] = useState(INITIAL);

  const setDefault = (id) => setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
  const remove = (id) => Alert.alert('Entfernen', 'Zahlungsmethode wirklich entfernen?', [
    { text: 'Abbrechen', style: 'cancel' },
    { text: 'Entfernen', style: 'destructive', onPress: () => setMethods((p) => p.filter((m) => m.id !== id)) },
  ]);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.iconWrap}><Ionicons name={CARD_ICONS[item.type] || 'card'} size={22} color={colors.white} /></View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardType}>{CARD_LABELS[item.type] || item.type}</Text>
          <Text style={styles.cardSub}>{item.last4 ? `•••• ${item.last4}  ·  ${item.expires}` : item.iban || item.email}</Text>
        </View>
        {item.isDefault ? <Badge label="Standard" color={colors.status.success} /> : null}
      </View>

      <View style={styles.actions}>
        {!item.isDefault ? (
          <TouchableOpacity style={styles.actionBtn} onPress={() => setDefault(item.id)}>
            <Ionicons name="checkmark-circle-outline" size={16} color={colors.status.success} />
            <Text style={[styles.actionText, { color: colors.status.success }]}>Standard</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.actionBtn} onPress={() => remove(item.id)}>
          <Ionicons name="trash-outline" size={16} color={colors.status.error} />
          <Text style={[styles.actionText, { color: colors.status.error }]}>Entfernen</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="Zahlungsmethoden" onBackPress={() => navigation.goBack()} />
      <FlatList
        data={methods}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Button onPress={() => navigation.navigate('AddPayment')} variant="outline" icon="add" iconPosition="left">Zahlungsmethode hinzufügen</Button>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  list: { padding: spacing.xl },
  card: { marginBottom: spacing.md },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  iconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary.main, alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  cardInfo: { flex: 1 },
  cardType: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  cardSub: { fontSize: typography.fontSize.sm, color: colors.gray[500], marginTop: 2 },
  actions: { flexDirection: 'row', gap: spacing.md, borderTopWidth: 1, borderTopColor: colors.gray[100], paddingTop: spacing.sm },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium },
});

export default PaymentMethodsScreen;
