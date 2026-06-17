import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, EmptyState } from '../../components/common';
import { colors, typography, spacing } from '../../constants/theme';

const now = Date.now();
const INITIAL_NOTIFS = [
  { id: '1', type: 'booking',  title: 'Buchung bestätigt',        body: 'Ihr Termin am 15.05 um 14:00 wurde bestätigt.', date: new Date(now - 2 * 60000),       read: false },
  { id: '2', type: 'reminder', title: 'Termin morgen',            body: 'Vergessen Sie nicht: Müller GmbH kommt morgen um 14 Uhr.', date: new Date(now - 3600000), read: false },
  { id: '3', type: 'promo',    title: '20% Rabatt auf Reinigung',  body: 'Nur heute: Buchen Sie einen Reinigungsservice und sparen Sie 20%.', date: new Date(now - 3 * 3600000), read: true },
  { id: '4', type: 'review',   title: 'Bewertung abgeben',        body: 'Wie war Ihr Termin mit Schmidt Sanitär?', date: new Date(now - 86400000), read: true },
  { id: '5', type: 'system',   title: 'App aktualisiert',         body: 'HomeServices wurde auf Version 1.1.0 aktualisiert.', date: new Date(now - 3 * 86400000), read: true },
];

const TYPE_META = {
  booking: { icon: 'calendar', color: colors.status.info }, reminder: { icon: 'time', color: colors.status.warning },
  promo:   { icon: 'pricetag', color: colors.status.success }, review: { icon: 'star', color: colors.accent.main },
  system:  { icon: 'settings', color: colors.gray[500] },
};

const timeAgo = (date) => {
  const diffMin = Math.floor((Date.now() - date) / 60000);
  if (diffMin < 1) return 'Gerade eben';
  if (diffMin < 60) return `Vor ${diffMin} Min`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `Vor ${diffHour} Std`;
  const diffDay = Math.floor(diffHour / 24);
  return diffDay === 1 ? 'Gestern' : `Vor ${diffDay} Tagen`;
};

const NotificationsScreen = ({ navigation }) => {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const markRead    = (id) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const unreadCount = notifs.filter((n) => !n.read).length;

  const renderItem = ({ item }) => {
    const meta = TYPE_META[item.type] || TYPE_META.system;
    return (
      <TouchableOpacity style={[styles.item, !item.read && styles.itemUnread]} onPress={() => markRead(item.id)} activeOpacity={0.7}>
        <View style={[styles.iconWrap, { backgroundColor: meta.color + '1A' }]}><Ionicons name={meta.icon} size={22} color={meta.color} /></View>
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Text style={[styles.itemTitle, !item.read && styles.itemTitleBold]}>{item.title}</Text>
            {!item.read ? <View style={styles.unreadDot} /> : null}
          </View>
          <Text style={styles.itemBody} numberOfLines={2}>{item.body}</Text>
          <Text style={styles.itemTime}>{timeAgo(item.date)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={`Benachrichtigungen${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
        onBackPress={() => navigation.goBack()}
        rightComponent={unreadCount > 0 ? <TouchableOpacity onPress={markAllRead}><Text style={styles.markAll}>Alle lesen</Text></TouchableOpacity> : undefined}
      />
      <FlatList
        data={notifs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="notifications-off-outline" title="Keine Benachrichtigungen" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  markAll: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.accent.main },
  list: { paddingVertical: spacing.sm },
  item: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: colors.white },
  itemUnread: { backgroundColor: colors.accent.main + '08' },
  iconWrap: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginRight: spacing.md, marginTop: 2 },
  itemContent: { flex: 1 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontSize: typography.fontSize.base, color: colors.gray[900], flex: 1 },
  itemTitleBold: { fontWeight: typography.fontWeight.semiBold },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent.main, marginLeft: spacing.sm },
  itemBody: { fontSize: typography.fontSize.sm, color: colors.gray[600], lineHeight: 20, marginBottom: 4 },
  itemTime: { fontSize: typography.fontSize.xs, color: colors.gray[400] },
  separator: { height: 1, backgroundColor: colors.gray[100] },
});

export default NotificationsScreen;
