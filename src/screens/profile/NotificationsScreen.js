import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Header, EmptyState } from '../../components/common';
import { notificationService } from '../../services';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const NotificationsScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);

  const TYPE_META = {
    booking_cancelled:     { icon: 'calendar-outline', color: d.danger },
    job_upcoming_reminder: { icon: 'time-outline', color: d.amber },
    review_received:       { icon: 'star-outline', color: d.amber },
    new_job:                { icon: 'briefcase-outline', color: d.line },
    job_assigned:           { icon: 'briefcase-outline', color: d.line },
    payout:                 { icon: 'cash-outline', color: d.green },
    default:                { icon: 'notifications-outline', color: d.textSoft },
  };

  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    notificationService.list().then((res) => {
      if (res.success) setNotifs(res.notifications);
      setLoading(false);
    });
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const markAllRead = async () => {
    setNotifs((p) => p.map((n) => ({ ...n, isRead: true })));
    await notificationService.markAllRead();
  };
  const markRead = async (id) => {
    setNotifs((p) => p.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    await notificationService.markRead(id);
  };
  const unreadCount = notifs.filter((n) => !n.isRead).length;

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
    const meta = TYPE_META[item.type] || TYPE_META.default;
    return (
      <TouchableOpacity style={[styles.item, !item.isRead && styles.itemUnread]} onPress={() => markRead(item.id)} activeOpacity={0.75}>
        <View style={[styles.iconWrap, { borderColor: meta.color }]}><Ionicons name={meta.icon} size={18} color={meta.color} /></View>
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Text style={[styles.itemTitle, !item.isRead && styles.itemTitleBold]}>{item.title}</Text>
            {!item.isRead ? <View style={styles.unreadDot} /> : null}
          </View>
          <Text style={styles.itemBody} numberOfLines={2}>{item.message}</Text>
          <Text style={styles.itemTime}>{timeAgo(new Date(item.createdAt))}</Text>
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
      {loading ? (
        <View style={styles.loadingBox}><ActivityIndicator color={d.line} size="large" /></View>
      ) : (
      <FlatList
        data={notifs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="notifications-off-outline" title={t('notifications.empty')} />}
      />
      )}
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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
