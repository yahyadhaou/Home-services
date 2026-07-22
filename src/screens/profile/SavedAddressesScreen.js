import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const INITIAL = [
  { id: 'a1', label: 'Home', icon: 'home-outline', line1: 'Musterstrasse 12', line2: '45127 Essen', isDefault: true },
  { id: 'a2', label: 'Office', icon: 'business-outline', line1: 'Bahnhofsplatz 3', line2: '45127 Essen', isDefault: false },
];

const SavedAddressesScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const [addresses] = useState(INITIAL);

  return (
    <View style={[styles.container, { backgroundColor: d.canvas }]}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <TouchableOpacity style={[styles.back, { borderColor: d.lineSoft }]} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={16} color={d.text} />
          </TouchableOpacity>
          <Text style={[styles.headTitle, { color: d.text }]}>{t('savedAddresses.title')}</Text>
        </View>

        {addresses.map((a) => (
          <View key={a.id} style={[styles.card, { backgroundColor: d.panel, borderColor: d.lineSoft }]}>
            <View style={[styles.iconWrap, { borderColor: d.lineSoft }]}>
              <Ionicons name={a.icon} size={18} color={d.line} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.labelRow}>
                <Text style={[styles.label, { color: d.text }]}>{a.label}</Text>
                {a.isDefault ? (
                  <View style={[styles.stamp, { borderColor: d.green }]}>
                    <Text style={[styles.stampText, { color: d.green }]}>{t('savedAddresses.default').toUpperCase()}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.line, { color: d.textSoft }]}>{a.line1}</Text>
              <Text style={[styles.line, { color: d.textSoft }]}>{a.line2}</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil-outline" size={16} color={d.line} />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={[styles.addBtn, { borderColor: d.lineSoft }]}>
          <Ionicons name="add" size={16} color={d.line} />
          <Text style={[styles.addText, { color: d.line }]}>{t('savedAddresses.addNew')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 18, paddingBottom: 32, paddingTop: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 },
  back: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headTitle: { fontSize: 16, fontWeight: '700' },

  card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10 },
  iconWrap: { width: 38, height: 38, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 13, fontWeight: '700' },
  stamp: { borderWidth: 1, borderRadius: 5, paddingHorizontal: 6, paddingVertical: 1 },
  stampText: { fontSize: 8, fontWeight: '700', letterSpacing: 0.3, fontFamily: MONO },
  line: { fontSize: 12, marginTop: 2 },
  editBtn: { padding: 6 },

  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderStyle: 'dashed', borderRadius: 12, padding: 13, marginTop: 8 },
  addText: { fontSize: 13, fontWeight: '600' },
});

export default SavedAddressesScreen;
