import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/common';
import { buildCalendarGrid } from '../../utils';
import { withServiceFee, SERVICE_FEE_RATE } from '../../constants/pricing';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const BookingScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const styles = createStyles(d);
  const provider = route.params?.provider || {};
  const service = route.params?.service;
  const hideFrequency = !!route.params?.hideFrequency;
  const prefilledSubtotal = route.params?.prefilledSubtotal; // relocation flow already computed its own subtotal (excl. fee)
  const today    = new Date();
  const [year, setYear]       = useState(today.getFullYear());
  const [month, setMonth]     = useState(today.getMonth());
  const [selDay, setSelDay]   = useState(null);
  const [selTime, setSelTime] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const [frequency, setFrequency] = useState('once');
  const cells = buildCalendarGrid(year, month);

  const FREQUENCIES = [
    { key: 'once', label: t('booking.freqOnce') },
    { key: 'weekly', label: t('booking.freqWeekly') },
    { key: 'biweekly', label: t('booking.freqBiweekly') },
    { key: 'monthly', label: t('booking.freqMonthly') },
  ];
  const isRecurring = !hideFrequency && frequency !== 'once';
  const basePrice = provider.hourlyRate || 80;
  const calloutFee = 25;
  const subtotalBeforeDiscount = prefilledSubtotal ?? (basePrice + calloutFee);
  const discount = isRecurring ? Math.round(subtotalBeforeDiscount * 0.1) : 0;
  const subtotal = subtotalBeforeDiscount - discount;
  const { fee, total: estimatedTotal } = withServiceFee(subtotal);

  const MONTHS = t('booking.months');
  const DAYS   = t('booking.days');

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear((y) => y - 1); } else setMonth((m) => m - 1); setSelDay(null); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear((y) => y + 1); } else setMonth((m) => m + 1); setSelDay(null); };

  const canContinue = selDay !== null && selTime !== '';
  const formatDate = () => (selDay ? `${String(selDay).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}` : '');

  const handleContinue = () => {
    navigation.navigate('BookingConfirmation', { provider, service, date: formatDate(), time: selTime, urgency, frequency, subtotal, fee, estimatedTotal, hideFrequency });
  };

  // Weeks are chunked explicitly (rather than relying on flexWrap to break
  // every 7 cells) so a date can never drift into the wrong weekday column
  // from floating-point width rounding on odd-width screens.
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <View style={styles.container}>
      <Header title={t('booking.title')} onBackPress={() => navigation.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.providerCard}>
          <View style={styles.providerRow}>
            <View style={styles.providerAvatar}><Ionicons name={provider.providerType === 'independent' ? 'person-outline' : 'business-outline'} size={20} color={d.line} /></View>
            <View style={styles.providerInfo}>
              <Text style={styles.providerName}>{provider.name || 'Rüttenscheider Sanitärtechnik GmbH'}</Text>
              <View style={styles.ratingRow}><Ionicons name="star" size={12} color={d.amber} /><Text style={styles.ratingText}>{provider.rating || '4.9'}</Text><Text style={styles.distanceText}> · {provider.distance || '1.2 km'}</Text></View>
            </View>
            {!prefilledSubtotal ? <Text style={styles.providerPrice}>€{basePrice}/h</Text> : null}
          </View>
        </View>

        {!hideFrequency ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('booking.urgency')}</Text>
            <View style={styles.urgencyRow}>
              {[
                { key: 'normal', label: t('booking.normal'), icon: 'calendar-outline', desc: t('booking.normalDesc') },
                { key: 'emergency', label: t('emergency.title').split(' ')[0], icon: 'alert-circle-outline', desc: t('booking.emergencyDesc') },
              ].map((opt) => {
                const isDanger = opt.key === 'emergency';
                const active = urgency === opt.key;
                return (
                  <TouchableOpacity key={opt.key} style={styles.urgencyTouchable} onPress={() => setUrgency(opt.key)}>
                    <View style={[styles.urgencyCard, active && (isDanger ? styles.urgencyCardDangerActive : styles.urgencyCardActive)]}>
                      <Ionicons name={opt.icon} size={22} color={active ? (isDanger ? d.danger : d.line) : d.textSoft} />
                      <Text style={[styles.urgencyLabel, active && { color: isDanger ? d.danger : d.text }]}>{opt.label}</Text>
                      <Text style={styles.urgencyDesc}>{opt.desc}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('booking.selectDate')}</Text>
          <View style={styles.calendarCard}>
            <View style={styles.monthNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.navBtn}><Ionicons name="chevron-back" size={16} color={d.text} /></TouchableOpacity>
              <Text style={styles.monthTitle}>{MONTHS[month]} {year}</Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navBtn}><Ionicons name="chevron-forward" size={16} color={d.text} /></TouchableOpacity>
            </View>
            <View style={styles.dayHeaders}>{DAYS.map((day) => <Text key={day} style={styles.dayHeader}>{day}</Text>)}</View>
            {weeks.map((week, wi) => (
              <View key={wi} style={styles.calRow}>
                {week.map((cellDay, i) => {
                  const isPast  = cellDay !== null && new Date(year, month, cellDay) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const isSel   = cellDay === selDay;
                  const isToday = cellDay === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[styles.calCell, cellDay === null && styles.calCellEmpty, isSel && styles.calCellSelected, isToday && !isSel && styles.calCellToday]}
                      onPress={() => cellDay && !isPast && setSelDay(cellDay)}
                      disabled={!cellDay || isPast}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.calCellText, isPast && styles.calCellPastText, isSel && styles.calCellSelectedText, isToday && !isSel && styles.calCellTodayText]}>{cellDay || ''}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {selDay !== null ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('booking.selectTime')}</Text>
            <View style={styles.timeGrid}>
              {TIME_SLOTS.map((slot) => (
                <TouchableOpacity key={slot} style={[styles.timeSlot, selTime === slot && styles.timeSlotActive]} onPress={() => setSelTime(slot)}>
                  <Text style={[styles.timeText, selTime === slot && styles.timeTextActive]}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}

        {!hideFrequency ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('booking.frequency')}</Text>
            <View style={styles.freqRow}>
              {FREQUENCIES.map((f) => (
                <TouchableOpacity key={f.key} style={[styles.freqChip, frequency === f.key && styles.freqChipActive]} onPress={() => setFrequency(f.key)}>
                  <Text style={[styles.freqText, frequency === f.key && styles.freqTextActive]}>{f.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {isRecurring ? <Text style={styles.freqHint}>{t('booking.recurringHint')}</Text> : null}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('booking.estimate')}</Text>
          <View style={styles.ticket}>
            {!prefilledSubtotal ? (
              <>
                <View style={styles.ticketRow}><Text style={styles.ticketLabel}>{t('booking.calloutFee')}</Text><Text style={styles.ticketValue}>€{calloutFee}</Text></View>
                <View style={styles.ticketRow}><Text style={styles.ticketLabel}>{t('booking.hourlyRate')}</Text><Text style={styles.ticketValue}>€{basePrice}/h</Text></View>
              </>
            ) : (
              <View style={styles.ticketRow}><Text style={styles.ticketLabel}>{t('booking.servicePrice')}</Text><Text style={styles.ticketValue}>€{subtotalBeforeDiscount}</Text></View>
            )}
            {isRecurring ? (
              <View style={styles.ticketRow}><Text style={[styles.ticketLabel, { color: d.green }]}>{t('booking.recurringDiscount')}</Text><Text style={[styles.ticketValue, { color: d.green }]}>-€{discount}</Text></View>
            ) : null}
            <View style={styles.ticketRow}><Text style={styles.ticketLabel}>{t('booking.serviceFee', { rate: Math.round(SERVICE_FEE_RATE * 100) })}</Text><Text style={styles.ticketValue}>€{fee}</Text></View>
            <View style={styles.ticketDivider} />
            <View style={styles.ticketRow}><Text style={styles.ticketTotalLabel}>{t('booking.estimatedTotal')}</Text><Text style={styles.ticketTotalValue}>€{estimatedTotal}</Text></View>
            <Text style={styles.ticketNote}>{t('booking.vatNote')}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summary}><Text style={styles.summaryLabel}>{t('booking.selected')}</Text><Text style={styles.summaryValue}>{canContinue ? `${formatDate()} ${selTime}` : t('booking.noDate')}</Text></View>
        <TouchableOpacity style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]} onPress={handleContinue} disabled={!canContinue}>
          <Text style={styles.continueBtnText}>{t('booking.continueButton')}</Text>
          <Ionicons name="arrow-forward" size={16} color={d.canvas} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  scrollContent: { padding: 18, paddingBottom: 110 },
  providerCard: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 14, marginBottom: 20 },
  providerRow: { flexDirection: 'row', alignItems: 'center' },
  providerAvatar: { width: 44, height: 44, borderRadius: 11, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 14, fontWeight: '700', color: d.text },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  ratingText: { fontSize: 12, fontWeight: '600', color: d.text },
  distanceText: { fontSize: 12, color: d.textSoft },
  providerPrice: { fontSize: 14, fontWeight: '700', color: d.text, fontFamily: MONO },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: d.text, marginBottom: 12 },
  urgencyRow: { flexDirection: 'row', gap: 8 },
  urgencyTouchable: { flex: 1 },
  urgencyCard: { backgroundColor: d.panel, borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: d.lineSoft },
  urgencyCardActive: { borderColor: d.line },
  urgencyCardDangerActive: { borderColor: d.danger, backgroundColor: d.dangerSoft },
  urgencyLabel: { fontSize: 13.5, fontWeight: '700', color: d.textSoft, marginTop: 6 },
  urgencyDesc: { fontSize: 10.5, color: d.textSoft, marginTop: 2 },
  calendarCard: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 14 },
  monthNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  navBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  monthTitle: { fontSize: 14, fontWeight: '700', color: d.text },
  dayHeaders: { flexDirection: 'row', marginBottom: 8 },
  dayHeader: { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '600', color: d.textSoft },
  calRow: { flexDirection: 'row' },
  calCell: { flex: 1, aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 999 },
  calCellEmpty: { opacity: 0 },
  calCellSelected: { backgroundColor: d.line },
  calCellToday: { borderWidth: 1, borderColor: d.line },
  calCellText: { fontSize: 13, color: d.text },
  calCellPastText: { color: d.textSoft, opacity: 0.4 },
  calCellSelectedText: { color: d.canvas, fontWeight: '700' },
  calCellTodayText: { color: d.line, fontWeight: '700' },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeSlot: { paddingVertical: 9, paddingHorizontal: 14, borderRadius: 8, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft },
  timeSlotActive: { backgroundColor: d.line, borderColor: d.line },
  timeText: { fontSize: 12.5, fontWeight: '600', color: d.text, fontFamily: MONO },
  timeTextActive: { color: d.canvas },
  freqRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  freqChip: { paddingVertical: 9, paddingHorizontal: 14, borderRadius: 20, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft },
  freqChipActive: { backgroundColor: d.line, borderColor: d.line },
  freqText: { fontSize: 12.5, fontWeight: '600', color: d.text },
  freqTextActive: { color: d.canvas },
  freqHint: { fontSize: 11.5, color: d.green, marginTop: 8 },
  ticket: { backgroundColor: d.panel, borderRadius: 12, borderWidth: 1, borderColor: d.lineSoft, padding: 14 },
  ticketRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  ticketLabel: { fontSize: 12.5, color: d.textSoft },
  ticketValue: { fontSize: 12.5, fontWeight: '600', color: d.text, fontFamily: MONO },
  ticketDivider: { height: 1, backgroundColor: d.lineSoft, marginVertical: 8 },
  ticketTotalLabel: { fontSize: 14, fontWeight: '700', color: d.text },
  ticketTotalValue: { fontSize: 17, fontWeight: '700', color: d.text, fontFamily: MONO },
  ticketNote: { fontSize: 10.5, color: d.textSoft, marginTop: 8 },
  footer: { backgroundColor: d.panel, borderTopWidth: 1, borderTopColor: d.lineSoft, paddingHorizontal: 18, paddingVertical: 14 },
  summary: { marginBottom: 10 },
  summaryLabel: { fontSize: 10.5, color: d.textSoft },
  summaryValue: { fontSize: 13.5, fontWeight: '600', color: d.text },
  continueBtn: { backgroundColor: d.line, borderRadius: 10, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  continueBtnDisabled: { opacity: 0.5 },
  continueBtnText: { fontSize: 14, fontWeight: '700', color: d.canvas },
});

export default BookingScreen;
