import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const CONVERSATIONS = [
  { id: 'c1', name: 'Rüttenscheider Sanitärtechnik GmbH', providerType: 'company',     lastMsg: 'Der Techniker ist in 10 Minuten da.',              time: '10:38', unread: 2 },
  { id: 'c2', name: 'ElektroMeister Krause GmbH',          providerType: 'company',     lastMsg: 'Können wir den Termin auf 15 Uhr verschieben?',      time: '08:15', unread: 1 },
  { id: 'c3', name: 'Blitzblank Gebäudereinigung GmbH',    providerType: 'company',     lastMsg: 'Vielen Dank für Ihre Buchung! Bis morgen.',           time: 'Gestern', unread: 0 },
  { id: 'c4', name: 'Jonas Vogt',                          providerType: 'independent', lastMsg: 'Bin gleich vor Ort, bringe alle Werkzeuge mit.',      time: 'Gestern', unread: 0 },
  { id: 'c5', name: 'Farbwerk Malerbetrieb GmbH',          providerType: 'company',     lastMsg: 'Die Farbe ist im Lager, wir kommen morgen früh.',     time: 'Mo.', unread: 0 },
  { id: 'c6', name: 'Nadine Krüger',                       providerType: 'independent', lastMsg: 'Klingt gut, ich schicke Ihnen ein Angebot.',          time: 'So.', unread: 0 },
  { id: 'c7', name: 'HomeServices Support',                providerType: 'company',     lastMsg: 'Wie können wir Ihnen weiterhelfen?',                  time: '12.07.', unread: 0 },
];

const ChatListScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? CONVERSATIONS.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : CONVERSATIONS;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChatThread', { provider: { name: item.name } })} activeOpacity={0.8}>
      <View style={styles.avatar}>
        <Ionicons name={item.providerType === 'independent' ? 'person-outline' : 'business-outline'} size={20} color={d.line} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.rowTop}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={[styles.lastMsg, item.unread > 0 && styles.lastMsgUnread]} numberOfLines={1}>{item.lastMsg}</Text>
          {item.unread > 0 ? <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View> : null}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={d.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('chatList.title')}</Text>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={14} color={d.textSoft} />
        <Text style={styles.searchPlaceholder}>{t('chatList.search')}</Text>
      </View>
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, marginBottom: 10 },
  backBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '700', color: d.text },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 18, marginBottom: 12, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 },
  searchPlaceholder: { fontSize: 13, color: d.textSoft },
  list: { paddingHorizontal: 18, paddingBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  avatar: { width: 44, height: 44, borderRadius: 11, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { flex: 1, fontSize: 13.5, fontWeight: '700', color: d.text, marginRight: 8 },
  time: { fontSize: 10.5, color: d.textSoft, fontFamily: MONO },
  rowBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 3, gap: 8 },
  lastMsg: { flex: 1, fontSize: 12, color: d.textSoft },
  lastMsgUnread: { color: d.text, fontWeight: '600' },
  unreadBadge: { minWidth: 18, height: 18, borderRadius: 9, backgroundColor: d.amber, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  unreadText: { fontSize: 10, fontWeight: '700', color: d.canvas },
});

export default ChatListScreen;
