import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { messageService } from '../../services';
import { EmptyState } from '../../components/common';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const formatTime = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
};

const ChatListScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const [query, setQuery] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    messageService.listConversations().then((res) => {
      if (res.success) setConversations(res.conversations);
      setLoading(false);
    });
  }, []);

  // Refetch every time this screen comes back into focus, so a
  // just-started conversation (from a provider profile) shows up.
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const filtered = query.trim()
    ? conversations.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : conversations;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('ChatThread', { conversationId: item.id, provider: { name: item.name, providerType: item.providerType } })}
      activeOpacity={0.8}
    >
      <View style={styles.avatar}>
        <Ionicons name={item.providerType === 'independent' ? 'person-outline' : 'business-outline'} size={20} color={d.line} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.rowTop}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.time}>{formatTime(item.lastMessageAt)}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={15} color={d.textSoft} />
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
      {loading ? (
        <View style={styles.loadingBox}><ActivityIndicator color={d.line} size="large" /></View>
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState icon="chatbubbles-outline" title={t('chatList.empty')} subtitle={t('chatList.emptySubtitle')} />
          }
        />
      )}
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
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingHorizontal: 18, paddingBottom: 24, flexGrow: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  avatar: { width: 44, height: 44, borderRadius: 11, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center' },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { flex: 1, fontSize: 13.5, fontWeight: '700', color: d.text, marginRight: 8 },
  time: { fontSize: 10.5, color: d.textSoft, fontFamily: MONO },
});

export default ChatListScreen;
