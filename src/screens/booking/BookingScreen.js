import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Header } from '../../components/common';
import { buildCalendarGrid } from '../../utils';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const MONTHS = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const DAYS   = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const BookingScreen = ({ navigation, route }) => {
  const provider = route.params?.provider || {};
  const today    = new Date();
  const [year, setYear]       = useState(today.getFullYear());
  const [month, setMonth]     = useState(today.getMonth());
  const [selDay, setSelDay]   = useState(null);
  const [selTime, setSelTime] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const cells = buildCalendarGrid(year, month);

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear((y) => y - 1); } else setMonth((m) => m - 1); setSelDay(null); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear((y) => y + 1); } else setMonth((m) => m + 1); setSelDay(null); };

  const canContinue = selDay !== null && selTime !== '';
  const formatDate = () => (selDay ? `${String(selDay).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}` : '');

  const handleContinue = () => {
    navigation.navigate('BookingConfirmation', { provider, date: formatDate(), time: selTime, urgency });
  };

  return (
    <View style={styles.container}>
      <Header title="Termin buchen" onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.providerCard}>
          <View style={styles.providerRow}>
            <View style={styles.providerAvatar}><Ionicons name="business" size={24} color={colors.accent.main} /></View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{provider.name || 'Müller GmbH'}</Text>
              <View style={styles.ratingRow}><Ionicons name="star" size={14} color={colors.accent.main} /><Text style={styles.ratingText}>{provider.rating || '4.9'}</Text><Text style={styles.distanceText}> · {provider.distance || '1.2 km'}</Text></View>
            </View>
            <Text style={styles.providerPrice}>€80/Std</Text>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dringlichkeit</Text>
          <View style={styles.urgencyRow}>
            {[{ key: 'normal', label: 'Normal', icon: 'calendar', desc: 'Termin vereinbaren' }, { key: 'emergency', label: 'Notfall', icon: 'alert-circle', desc: 'Sofort verfügbar', color: colors.status.error }].map((opt) => (
              <TouchableOpacity key={opt.key} style={[styles.urgencyCard, urgency === opt.key && styles.urgencyCardActive]} onPress={() => setUrgency(opt.key)}>
                <Ionicons name={opt.icon} size={26} color={urgency === opt.key ? colors.white : (opt.color || colors.gray[600])} />
                <Text style={[styles.urgencyLabel, urgency === opt.key && styles.urgencyLabelActive]}>{opt.label}</Text>
                <Text style={[styles.urgencyDesc, urgency === opt.key && styles.urgencyDescActive]}>{opt.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datum wählen</Text>
          <Card style={styles.calendarCard}>
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.navBtn}><Ionicons name="chevron-back" size={20} color={colors.gray[700]} /></TouchableOpacity>
              <Text style={styles.monthTitle}>{MONTHS[month]} {year}</Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navBtn}><Ionicons name="chevron-forward" size={20} color={colors.gray[700]} /></TouchableOpacity>
            </View>
            <View style={styles.dayHeaders}>{DAYS.map((d) => <Text key={d} style={styles.dayHeader}>{d}</Text>)}</View>
            <View style={styles.calGrid}>
              {cells.map((d, i) => {
                const isPast  = d !== null && new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const isSel   = d === selDay;
                const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.calCell, d === null && styles.calCellEmpty, isSel && styles.calCellSelected, isToday && !isSel && styles.calCellToday]}
                    onPress={() => d && !isPast && setSelDay(d)}
                    disabled={!d || isPast}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.calCellText, isPast && styles.calCellPastText, isSel && styles.calCellSelectedText, isToday && !isSel && styles.calCellTodayText]}>{d || ''}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>
        </View>

        {selDay !== null ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Uhrzeit wählen</Text>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((t) => (
                <TouchableOpacity key={t} style={[styles.timeSlot, selTime === t && styles.timeSlotActive]} onPress={() => setSelTime(t)}>
                  <Text style={[styles.timeText, selTime === t && styles.timeTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summary}><Text style={styles.summaryLabel}>Gewählt:</Text><Text style={styles.summaryValue}>{canContinue ? `${formatDate()} um ${selTime}` : 'Noch kein Termin'}</Text></View>
        <TouchableOpacity style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]} onPress={handleContinue} disabled={!canContinue}>
          <Text style={styles.continueBtnText}>Weiter</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  scrollContent: { padding: spacing.xl, paddingBottom: 100 },
  providerCard: { marginBottom: spacing.xl },
  providerRow: { flexDirection: 'row', alignItems: 'center' },
  providerAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  providerInfo: { flex: 1 },
  providerName: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  ratingText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[700] },
  distanceText: { fontSize: typography.fontSize.sm, color: colors.gray[500] },
  providerPrice: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  section: { marginBottom: spacing.xl },
  sectionTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900], marginBottom: spacing.md },
  urgencyRow: { flexDirection: 'row', gap: spacing.sm },
  urgencyCard: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center', borderWidth: 2, borderColor: colors.gray[200], ...shadows.sm },
  urgencyCardActive: { backgroundColor: colors.accent.main, borderColor: colors.accent.main },
  urgencyLabel: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[800], marginTop: spacing.xs },
  urgencyLabelActive: { color: colors.white },
  urgencyDesc: { fontSize: typography.fontSize.xs, color: colors.gray[500], marginTop: 2 },
  urgencyDescActive: { color: colors.white, opacity: 0.85 },
  calendarCard: { padding: spacing.md },
  monthNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  navBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center' },
  monthTitle: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  dayHeaders: { flexDirection: 'row', marginBottom: spacing.sm },
  dayHeader: { flex: 1, textAlign: 'center', fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[500] },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 999 },
  calCellEmpty: { opacity: 0 },
  calCellSelected: { backgroundColor: colors.accent.main },
  calCellToday: { backgroundColor: colors.accent.main + '22' },
  calCellText: { fontSize: typography.fontSize.base, color: colors.gray[900] },
  calCellPastText: { color: colors.gray[300] },
  calCellSelectedText: { color: colors.white, fontWeight: typography.fontWeight.bold },
  calCellTodayText: { color: colors.accent.dark, fontWeight: typography.fontWeight.semiBold },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  timeSlot: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: borderRadius.sm, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray[200] },
  timeSlotActive: { backgroundColor: colors.accent.main, borderColor: colors.accent.main },
  timeText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.gray[700] },
  timeTextActive: { color: colors.white },
  footer: { backgroundColor: colors.white, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, ...shadows.xl },
  summary: { marginBottom: spacing.sm },
  summaryLabel: { fontSize: typography.fontSize.xs, color: colors.gray[500] },
  summaryValue: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.gray[900] },
  continueBtn: { backgroundColor: colors.accent.main, borderRadius: borderRadius.md, paddingVertical: spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  continueBtnDisabled: { opacity: 0.5 },
  continueBtnText: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.white },
});

export default BookingScreen;
