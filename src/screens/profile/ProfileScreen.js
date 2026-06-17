import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/common';
import { useApp } from '../../context/AppContext';
import { getInitials } from '../../utils';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const MENU_ITEMS = [
  { icon: 'person-outline',        label: 'Profil bearbeiten',  screen: 'EditProfile'    },
  { icon: 'calendar-outline',      label: 'Meine Buchungen',    screen: 'MyBookings'     },
  { icon: 'heart-outline',         label: 'Favoriten',          screen: 'Favorites'      },
  { icon: 'card-outline',          label: 'Zahlungsmethoden',   screen: 'PaymentMethods' },
  { icon: 'notifications-outline', label: 'Benachrichtigungen', screen: 'Notifications'  },
  { icon: 'settings-outline',      label: 'Einstellungen',      screen: 'Settings'       },
];

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useApp();

  const handleLogout = () => { logout(); navigation.replace('Welcome'); };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[colors.primary.main, colors.primary.light]} style={styles.header}>
        <View style={styles.avatarWrap}><View style={styles.avatar}><Text style={styles.avatarText}>{getInitials(user?.name || 'Gast')}</Text></View></View>
        <Text style={styles.name}>{user?.name || 'Gast'}</Text>
        <Text style={styles.email}>{user?.email || 'gast@beispiel.de'}</Text>
        <Text style={styles.phone}>{user?.phone || '+49 000 000 0000'}</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          {[{ val: '12', lbl: 'Buchungen' }, { val: '5', lbl: 'Favoriten' }, { val: '4.9', lbl: 'Bewertung' }].map((s, i) => (
            <Card key={i} style={styles.statCard}><Text style={styles.statVal}>{s.val}</Text><Text style={styles.statLbl}>{s.lbl}</Text></Card>
          ))}
        </View>

        <Card style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity key={item.screen} style={[styles.menuItem, i < MENU_ITEMS.length - 1 && styles.menuItemBorder]} onPress={() => navigation.navigate(item.screen)}>
              <View style={styles.menuLeft}><View style={styles.menuIconWrap}><Ionicons name={item.icon} size={20} color={colors.accent.main} /></View><Text style={styles.menuLabel}>{item.label}</Text></View>
              <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.status.error} />
          <Text style={styles.logoutText}>Abmelden</Text>
        </TouchableOpacity>

        <Text style={styles.version}>HomeServices v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  header: { paddingTop: 70, paddingBottom: spacing.xl, alignItems: 'center' },
  avatarWrap: { marginBottom: spacing.md },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.accent.main, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)' },
  avatarText: { fontSize: 36, fontWeight: typography.fontWeight.bold, color: colors.white },
  name: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, color: colors.white },
  email: { fontSize: typography.fontSize.sm, color: colors.white, opacity: 0.8, marginTop: 2 },
  phone: { fontSize: typography.fontSize.sm, color: colors.white, opacity: 0.8, marginTop: 2 },
  content: { flex: 1, padding: spacing.xl },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: spacing.md },
  statVal: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.gray[900] },
  statLbl: { fontSize: typography.fontSize.xs, color: colors.gray[500], marginTop: 2 },
  menuCard: { marginBottom: spacing.lg, padding: 0, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.gray[100] },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  menuIconWrap: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.accent.main + '18', alignItems: 'center', justifyContent: 'center' },
  menuLabel: { fontSize: typography.fontSize.base, color: colors.gray[800] },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, paddingVertical: spacing.md, backgroundColor: colors.status.error + '12', borderRadius: borderRadius.md, marginBottom: spacing.xl },
  logoutText: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.status.error },
  version: { textAlign: 'center', fontSize: typography.fontSize.xs, color: colors.gray[400], marginBottom: spacing.xl },
});

export default ProfileScreen;
