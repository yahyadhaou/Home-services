import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';
import { getInitials } from '../../utils';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useApp();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);

  const MENU_ITEMS = [
    { icon: 'person-outline',        label: t('profile.editProfile'),  screen: 'EditProfile'    },
    { icon: 'calendar-outline',      label: t('profile.myBookings'),   screen: 'MyBookings'     },
    { icon: 'heart-outline',         label: t('profile.favorites'),    screen: 'Favorites'      },
    { icon: 'card-outline',          label: t('profile.paymentMethods'), screen: 'PaymentMethods' },
    { icon: 'location-outline',      label: t('profile.savedAddresses'), screen: 'SavedAddresses' },
    { icon: 'chatbubbles-outline',   label: t('profile.messages'),     screen: 'ChatList'       },
    { icon: 'notifications-outline', label: t('profile.notifications'), screen: 'Notifications'  },
    { icon: 'help-buoy-outline',     label: t('profile.helpSupport'),  screen: 'HelpSupport'    },
    { icon: 'settings-outline',      label: t('profile.settings'),     screen: 'Settings'       },
  ];

  const handleLogout = () => { logout(); navigation.replace('Welcome'); };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{getInitials(user?.name || t('profile.guest'))}</Text></View>
          </View>
          <Text style={styles.name}>{user?.name || t('profile.guest')}</Text>
          <Text style={styles.email}>{user?.email || 'guest@example.com'}</Text>
          <Text style={styles.phone}>{user?.phone || '+49 000 000 0000'}</Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { val: '12', lbl: t('profile.bookings') },
            { val: '5',  lbl: t('profile.favorites') },
            { val: '4.9', lbl: t('profile.rating') },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}><Text style={styles.statVal}>{s.val}</Text><Text style={styles.statLbl}>{s.lbl.toUpperCase()}</Text></View>
          ))}
        </View>

        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={item.screen} style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuItemBorder]} onPress={() => navigation.navigate(item.screen)}>
              <View style={styles.menuLeft}><Ionicons name={item.icon} size={17} color={d.line} /><Text style={styles.menuLabel}>{item.label}</Text></View>
              <Ionicons name="chevron-forward" size={15} color={d.textSoft} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={17} color={d.danger} />
          <Text style={styles.logoutText}>{t('profile.logOut')}</Text>
        </TouchableOpacity>

        <Text style={styles.version}>{t('settings.version')}</Text>
      </ScrollView>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  content: { flex: 1, padding: 18 },
  header: { alignItems: 'center', paddingTop: 30, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: d.lineSoft, marginBottom: 16 },
  avatarWrap: { marginBottom: 12 },
  avatar: { width: 76, height: 76, borderRadius: 18, borderWidth: 1.5, borderColor: d.line, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '700', color: d.line },
  name: { fontSize: 19, fontWeight: '700', color: d.text },
  email: { fontSize: 12.5, color: d.textSoft, marginTop: 2 },
  phone: { fontSize: 12.5, color: d.textSoft, marginTop: 1 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12 },
  statVal: { fontSize: 17, fontWeight: '700', color: d.text, fontFamily: MONO },
  statLbl: { fontSize: 9, color: d.textSoft, marginTop: 2, fontFamily: MONO },
  menuCard: { marginBottom: 18, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 14 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuLabel: { fontSize: 13.5, color: d.text },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 13, backgroundColor: d.dangerSoft, borderWidth: 1, borderColor: d.danger, borderRadius: 10, marginBottom: 20 },
  logoutText: { fontSize: 13.5, fontWeight: '700', color: d.danger },
  version: { textAlign: 'center', fontSize: 11, color: d.textSoft, marginBottom: 20 },
});

export default ProfileScreen;
