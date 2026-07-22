import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header, EmptyState } from '../../components/common';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const now = Date.now();

const NotificationsScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);

  const TYPE_META = {
    booking: { icon: 'calendar-outline', color: d.line }, reminder: { icon: 'time-outline', color: d.amber },
    promo:   { icon: 'pricetag-outline', color: d.green }, review: { icon: 'star-outline', color: d.amber },
    system:  { icon: 'settings-outline', color: d.textSoft },
  };

  const INITIAL_NOTIFS = [
    { id: '1', type: 'booking',  title: t('notifications.bookingConfirmedTitle'), body: t('notifications.bookingConfirmedBody'), date: new Date(now - 2 * 60000),       read: false },
    { id: '2', type: 'reminder', title: t('notifications.reminderTitle'),         body: t('notifications.reminderBody'),         date: new Date(now - 3600000),         read: false },
    { id: '3', type: 'promo',    title: t('notifications.promoTitle'),            body: t('notifications.promoBody'),            date: new Date(now - 3 * 3600000),     read: true  },
    { id: '4', type: 'review',   title: t('notifications.reviewTitle'),           body: t('notifications.reviewBody'),           date: new Date(now - 86400000),        read: true  },
    { id: '5', type: 'system',   title: t('notifications.systemTitle'),           body: t('notifications.systemBody'),           date: new Date(now - 3 * 86400000),    read: true  },
  ];

  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const markAllRead = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const markRead    = (id) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const unreadCount = notifs.filter((n) => !n.read).length;

  const timeAgo = (date) => {
    const diffMin = Math.floor((Date.now() - date) / 60000);
    if (diffMin < 1) return t('notifications.justNow');
    if (diffMin < 60) return `${diffMin} ${t('notifications.minAgo')}`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} ${t('notifications.hoursAgo')}`;
    const diffDay = Math.floor(diffHour / 24);
    return diffDay === 1 ? t('notifications.yesterday') : `${diffDay} ${t('notifications.daysAgo')}`;
  };

  const renderItem = ({ item }) => {
    const meta = TYPE_META[item.type] || TYPE_META.system;
    return (
      <TouchableOpacity style={[styles.item, !item.read && styles.itemUnread]} onPress={() => markRead(item.id)} activeOpacity={0.75}>
        <View style={[styles.iconWrap, { borderColor: meta.color }]}><Ionicons name={meta.icon} size={18} color={meta.color} /></View>
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
        title={`${t('notifications.title')}${unreadCount > 0 ? ` (${unreadCount})` : ''}`}
        onBackPress={() => navigation.goBack()}
        rightComponent={unreadCount > 0 ? <TouchableOpacity onPress={markAllRead}><Text style={styles.markAll}>{t('notifications.markAllRead')}</Text></TouchableOpacity> : undefined}
      />
      <FlatList
        data={notifs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="notifications-off-outline" title={t('notifications.empty')} />}
      />
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  markAll: { fontSize: 12, fontWeight: '600', color: d.line },
  list: { paddingVertical: 8 },
  item: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 18, paddingVertical: 14, backgroundColor: d.canvas },
  itemUnread: { backgroundColor: d.panel },
  iconWrap: { width: 38, height: 38, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 2 },
  itemContent: { flex: 1 },
  itemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  itemTitle: { fontSize: 13.5, color: d.text, flex: 1 },
  itemTitleBold: { fontWeight: '700' },
  unreadDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: d.amber, marginLeft: 8 },
  itemBody: { fontSize: 12, color: d.textSoft, lineHeight: 18, marginBottom: 4 },
  itemTime: { fontSize: 10.5, color: d.textSoft },
  separator: { height: 1, backgroundColor: d.lineSoft },
});

export default NotificationsScreen;
