import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { providerService } from '../../services';
import { withServiceFee, SERVICE_FEE_RATE } from '../../constants/pricing';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const ROOM_OPTIONS = [
  { key: '1', vol: 8 }, { key: '2', vol: 14 }, { key: '3', vol: 20 }, { key: '4', vol: 28 },
];

const ITEM_OPTIONS = [
  { key: 'furniture',  icon: 'bed-outline',            vol: 6 },
  { key: 'boxes',       icon: 'cube-outline',            vol: 4 },
  { key: 'appliances',  icon: 'tv-outline',               vol: 3 },
  { key: 'kitchen',     icon: 'restaurant-outline',       vol: 5 },
  { key: 'heavy',       icon: 'musical-notes-outline',    vol: 5 },
  { key: 'misc',        icon: 'bicycle-outline',          vol: 1 },
];

const ROUTE_OPTIONS = [
  { key: 'essen',     km: 8 },
  { key: 'muelheim',  km: 9 },
  { key: 'bochum',    km: 13 },
  { key: 'oberhausen', km: 15 },
  { key: 'duisburg',  km: 21 },
  { key: 'duesseldorf', km: 31 },
  { key: 'dortmund',  km: 36 },
];

const TIERS = [
  { max: 6,  icon: 'car-outline' },
  { max: 15, icon: 'bus-outline' },
  { max: 25, icon: 'car-sport-outline' },
  { max: 40, icon: 'bus' },
  { max: 999, icon: 'business-outline' },
];

const tierIndexFor = (vol) => TIERS.findIndex((t) => vol <= t.max);

const RelocationScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);

  const [step, setStep] = useState(0);
  const [propertyType, setPropertyType] = useState('apartment');
  const [rooms, setRooms] = useState('2');
  const [floor, setFloor] = useState(2);
  const [elevator, setElevator] = useState(true);
  const [items, setItems] = useState(new Set(['furniture', 'boxes']));
  const [toCity, setToCity] = useState('essen');
  const [moverType, setMoverType] = useState(null);
  const [helperCount, setHelperCount] = useState(2);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    providerService.getProviders('Umzug').then((res) => { if (res.success) setProviders(res.providers); });
  }, []);

  const baseVol = ROOM_OPTIONS.find((r) => r.key === rooms)?.vol || 14;
  const itemsVol = ITEM_OPTIONS.filter((i) => items.has(i.key)).reduce((s, i) => s + i.vol, 0);
  const totalVol = baseVol + itemsVol;
  const floorPenalty = !elevator ? floor * 2 : 0;
  const tierIdx = tierIndexFor(totalVol);
  const km = ROUTE_OPTIONS.find((r) => r.key === toCity)?.km || 8;

  const recommendedHelpers = Math.max(1, Math.min(3, Math.ceil(totalVol / 16)));
  const estimatedHours = Math.max(2, Math.ceil(totalVol / (8 * helperCount)));

  // Every mode's number here is a *subtotal* — the platform service fee is
  // added once, centrally, in BookingScreen via withServiceFee(), so it's
  // never computed twice and never drifts between screens.
  const companySubtotal = Math.round(89 + 1.3 * km + 8 * totalVol + floorPenalty * 5);
  const independentSubtotal = Math.round(helperCount * 32 * estimatedHours + 0.8 * km + floorPenalty * 3);
  const laborSubtotal = Math.round(helperCount * 26 * estimatedHours + floorPenalty * 2);

  const companyDisplay = withServiceFee(companySubtotal);
  const independentDisplay = withServiceFee(independentSubtotal);
  const laborDisplay = withServiceFee(laborSubtotal);

  const toggleItem = (key) => setItems((prev) => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  const barAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(barAnim, { toValue: Math.min(totalVol / 45, 1), duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [totalVol]);
  const barWidth = barAnim.interpolate({ inputRange: [0, 1], outputRange: ['4%', '100%'] });

  const companies = providers.filter((p) => p.providerType === 'company');
  const independents = providers.filter((p) => p.providerType === 'independent');
  const matched = moverType === 'company' ? companies : moverType ? independents : [];

  const STEPS = ['home', 'items', 'route', 'mover'];
  const canNext = step === 0 ? true : step === 1 ? items.size > 0 : step === 2 ? true : false;

  const subtotalForMode = moverType === 'company' ? companySubtotal : moverType === 'independent' ? independentSubtotal : laborSubtotal;

  const bookWith = (provider) => {
    navigation.navigate('Booking', {
      provider, service: t('relocation.title'), hideFrequency: true, prefilledSubtotal: subtotalForMode,
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.head}>
        <View style={styles.headIconWrap}><Ionicons name="cube-outline" size={18} color={d.line} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{t('relocation.title')}</Text>
          <Text style={styles.subtitle}>{t('relocation.subtitle')}</Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        {STEPS.map((s, i) => (
          <View key={s} style={[styles.progressSeg, { backgroundColor: i <= step ? d.line : d.lineSoft }]} />
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {step === 0 ? (
          <View>
            <Text style={styles.stepTitle}>{t('relocation.stepHomeTitle')}</Text>

            <Text style={styles.label}>{t('relocation.propertyType').toUpperCase()}</Text>
            <View style={styles.rowChips}>
              {['apartment', 'house'].map((k) => (
                <TouchableOpacity key={k} style={[styles.chip, propertyType === k && styles.chipActive]} onPress={() => setPropertyType(k)}>
                  <Ionicons name={k === 'apartment' ? 'business-outline' : 'home-outline'} size={14} color={propertyType === k ? d.canvas : d.line} />
                  <Text style={[styles.chipText, propertyType === k && styles.chipTextActive]}>{t(`relocation.${k}`)}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>{t('relocation.roomCount').toUpperCase()}</Text>
            <View style={styles.rowChips}>
              {ROOM_OPTIONS.map((r) => (
                <TouchableOpacity key={r.key} style={[styles.chip, rooms === r.key && styles.chipActive]} onPress={() => setRooms(r.key)}>
                  <Text style={[styles.chipText, rooms === r.key && styles.chipTextActive]}>{r.key}{r.key === '4' ? '+' : ''} {t('relocation.rooms')}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>{t('relocation.floor').toUpperCase()}</Text>
            <View style={styles.stepperRow}>
              <TouchableOpacity style={styles.stepperBtn} onPress={() => setFloor((f) => Math.max(0, f - 1))}><Ionicons name="remove" size={16} color={d.text} /></TouchableOpacity>
              <Text style={styles.stepperVal}>{floor === 0 ? t('relocation.groundFloor') : `${floor}. ${t('relocation.floorShort')}`}</Text>
              <TouchableOpacity style={styles.stepperBtn} onPress={() => setFloor((f) => Math.min(15, f + 1))}><Ionicons name="add" size={16} color={d.text} /></TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.toggleRow} onPress={() => setElevator((e) => !e)}>
              <View style={[styles.checkbox, elevator && styles.checkboxActive]}>{elevator ? <Ionicons name="checkmark" size={13} color={d.canvas} /> : null}</View>
              <Text style={styles.toggleLabel}>{t('relocation.hasElevator')}</Text>
            </TouchableOpacity>
            {!elevator && floor > 0 ? <Text style={styles.hint}>{t('relocation.noElevatorHint', { floor })}</Text> : null}
          </View>
        ) : null}

        {step === 1 ? (
          <View>
            <Text style={styles.stepTitle}>{t('relocation.stepItemsTitle')}</Text>
            <View style={styles.itemGrid}>
              {ITEM_OPTIONS.map((it) => {
                const active = items.has(it.key);
                return (
                  <TouchableOpacity key={it.key} style={[styles.itemCard, active && styles.itemCardActive]} onPress={() => toggleItem(it.key)}>
                    <Ionicons name={it.icon} size={22} color={active ? d.canvas : d.line} />
                    <Text style={[styles.itemLabel, active && styles.itemLabelActive]}>{t(`relocation.item_${it.key}`)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.volCard}>
              <View style={styles.volHeadRow}>
                <Text style={styles.volLabel}>{t('relocation.estimatedVolume').toUpperCase()}</Text>
                <Text style={styles.volValue}>{totalVol} M³</Text>
              </View>
              <View style={styles.volBarTrack}>
                <Animated.View style={[styles.volBarFill, { width: barWidth, backgroundColor: d.amber }]} />
              </View>
              <View style={styles.tierRow}>
                {TIERS.slice(0, 4).map((tier, i) => (
                  <View key={i} style={styles.tierItem}>
                    <Ionicons name={tier.icon} size={16} color={i === tierIdx ? d.amber : d.textSoft} />
                    <Text style={[styles.tierLabel, i === tierIdx && { color: d.amber, fontWeight: '700' }]}>{t(`relocation.tier_${i}`)}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.volNote}>{t('relocation.volumeNote')}</Text>
            </View>
          </View>
        ) : null}

        {step === 2 ? (
          <View>
            <Text style={styles.stepTitle}>{t('relocation.stepRouteTitle')}</Text>
            <View style={styles.routeCard}>
              <View style={styles.routeEnd}>
                <Ionicons name="home-outline" size={16} color={d.line} />
                <Text style={styles.routeEndLabel}>Rüttenscheid</Text>
              </View>
              <View style={styles.routeLine}>
                <View style={[styles.routeDash, { backgroundColor: d.lineSoft }]} />
                <Text style={styles.routeKm}>{km} KM</Text>
              </View>
              <View style={styles.routeEnd}>
                <Ionicons name="flag-outline" size={16} color={d.amber} />
                <Text style={styles.routeEndLabel}>{t(`relocation.city_${toCity}`)}</Text>
              </View>
            </View>

            <Text style={styles.label}>{t('relocation.destination').toUpperCase()}</Text>
            <View style={styles.rowChipsWrap}>
              {ROUTE_OPTIONS.map((r) => (
                <TouchableOpacity key={r.key} style={[styles.chip, toCity === r.key && styles.chipActive]} onPress={() => setToCity(r.key)}>
                  <Text style={[styles.chipText, toCity === r.key && styles.chipTextActive]}>{t(`relocation.city_${r.key}`)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}

        {step === 3 ? (
          <View>
            <Text style={styles.stepTitle}>{t('relocation.stepMoverTitle')}</Text>

            <TouchableOpacity style={[styles.moverCard, moverType === 'company' && styles.moverCardActive]} onPress={() => setMoverType('company')} activeOpacity={0.85}>
              <View style={styles.moverHead}>
                <Ionicons name="business-outline" size={22} color={d.line} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.moverName}>{t('relocation.companyOption')}</Text>
                  <Text style={styles.moverSub}>{t('relocation.companyDesc')}</Text>
                </View>
                <Text style={styles.moverPrice}>€{companyDisplay.total}</Text>
              </View>
              <View style={styles.moverBullets}>
                {['insured', 'fixedPrice', 'crew'].map((k) => (
                  <View key={k} style={styles.bulletRow}><Ionicons name="checkmark-circle" size={13} color={d.green} /><Text style={styles.bulletText}>{t(`relocation.bullet_${k}`)}</Text></View>
                ))}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.moverCard, moverType === 'independent' && styles.moverCardActive]} onPress={() => setMoverType('independent')} activeOpacity={0.85}>
              <View style={styles.moverHead}>
                <Ionicons name="person-outline" size={22} color={d.line} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.moverName}>{t('relocation.independentOption')}</Text>
                  <Text style={styles.moverSub}>{t('relocation.independentDesc')}</Text>
                </View>
                <Text style={styles.moverPrice}>€{independentDisplay.total}</Text>
              </View>
              <View style={styles.moverBullets}>
                {['cheaper', 'flexible', 'ownCar'].map((k) => (
                  <View key={k} style={styles.bulletRow}><Ionicons name="checkmark-circle" size={13} color={d.green} /><Text style={styles.bulletText}>{t(`relocation.bullet_${k}`)}</Text></View>
                ))}
                <View style={styles.bulletRow}><Ionicons name="alert-circle-outline" size={13} color={d.amber} /><Text style={[styles.bulletText, { color: d.amber }]}>{t('relocation.bullet_notInsured')}</Text></View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.moverCard, moverType === 'labor' && styles.moverCardActive]} onPress={() => setMoverType('labor')} activeOpacity={0.85}>
              <View style={styles.moverHead}>
                <Ionicons name="people-outline" size={22} color={d.line} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.moverName}>{t('relocation.laborOption')}</Text>
                  <Text style={styles.moverSub}>{t('relocation.laborDesc')}</Text>
                </View>
                <Text style={styles.moverPrice}>€{laborDisplay.total}</Text>
              </View>
              <View style={styles.moverBullets}>
                {['cheapest', 'yourVan'].map((k) => (
                  <View key={k} style={styles.bulletRow}><Ionicons name="checkmark-circle" size={13} color={d.green} /><Text style={styles.bulletText}>{t(`relocation.bullet_${k}`)}</Text></View>
                ))}
                <View style={styles.bulletRow}><Ionicons name="alert-circle-outline" size={13} color={d.amber} /><Text style={[styles.bulletText, { color: d.amber }]}>{t('relocation.bullet_notInsured')}</Text></View>
              </View>
            </TouchableOpacity>

            {(moverType === 'independent' || moverType === 'labor') ? (
              <View style={styles.helperCard}>
                <Text style={styles.label}>{t('relocation.helperCount').toUpperCase()}</Text>
                <View style={styles.stepperRow}>
                  <TouchableOpacity style={styles.stepperBtn} onPress={() => setHelperCount((h) => Math.max(1, h - 1))}><Ionicons name="remove" size={16} color={d.text} /></TouchableOpacity>
                  <Text style={styles.stepperVal}>{helperCount} {t('relocation.helpers')}</Text>
                  <TouchableOpacity style={styles.stepperBtn} onPress={() => setHelperCount((h) => Math.min(3, h + 1))}><Ionicons name="add" size={16} color={d.text} /></TouchableOpacity>
                </View>
                {totalVol > 24 && helperCount < recommendedHelpers ? (
                  <Text style={styles.hint}>{t('relocation.recommendHelpers', { count: recommendedHelpers })}</Text>
                ) : null}
              </View>
            ) : null}

            {moverType ? (
              <View style={styles.matchSection}>
                <Text style={styles.label}>{t('relocation.matched').toUpperCase()}</Text>
                {matched.map((p) => {
                  const smallVehicle = moverType === 'independent' && p.maxVolume < totalVol / helperCount;
                  return (
                    <TouchableOpacity key={p.id} style={styles.matchCard} onPress={() => bookWith(p)} activeOpacity={0.85}>
                      <View style={styles.matchIcon}><Ionicons name={p.providerType === 'independent' ? 'person-outline' : 'business-outline'} size={18} color={d.line} /></View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.matchName}>{p.name}</Text>
                        <Text style={styles.matchMeta}>{moverType === 'labor' ? t('relocation.laborOnly') : p.vehicle} · {p.district}</Text>
                        {smallVehicle ? <Text style={styles.matchWarn}>{t('relocation.mayNeedTrips')}</Text> : null}
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.matchRating}>★ {p.rating}</Text>
                        <Ionicons name="chevron-forward" size={14} color={d.textSoft} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
                {matched.length === 0 ? <Text style={styles.hint}>{t('relocation.noMatch')}</Text> : null}
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        {step > 0 ? (
          <TouchableOpacity style={styles.backBtn} onPress={() => setStep((s) => s - 1)}>
            <Ionicons name="arrow-back" size={16} color={d.text} />
          </TouchableOpacity>
        ) : null}
        {step < 3 ? (
          <TouchableOpacity style={[styles.nextBtn, !canNext && styles.nextBtnDisabled]} disabled={!canNext} onPress={() => setStep((s) => s + 1)}>
            <Text style={styles.nextBtnText}>{t('relocation.continue')}</Text>
            <Ionicons name="arrow-forward" size={16} color={d.canvas} />
          </TouchableOpacity>
        ) : (
          <View style={styles.footerHintWrap}><Text style={styles.footerHint}>{t('relocation.pickHint')}</Text></View>
        )}
      </View>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 18, marginBottom: 12 },
  headIconWrap: { width: 34, height: 34, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 17, fontWeight: '700', color: d.text },
  subtitle: { fontSize: 11.5, color: d.textSoft, marginTop: 1 },

  progressRow: { flexDirection: 'row', gap: 6, paddingHorizontal: 18, marginBottom: 16 },
  progressSeg: { flex: 1, height: 3, borderRadius: 2 },

  scroll: { paddingHorizontal: 18, paddingBottom: 24 },
  stepTitle: { fontSize: 15, fontWeight: '700', color: d.text, marginBottom: 14 },
  label: { fontSize: 10, letterSpacing: 0.5, color: d.textSoft, fontFamily: MONO, marginBottom: 8, marginTop: 4 },

  rowChips: { flexDirection: 'row', gap: 8, marginBottom: 8, flexWrap: 'wrap' },
  rowChipsWrap: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 8 },
  chipActive: { backgroundColor: d.line, borderColor: d.line },
  chipText: { fontSize: 12.5, fontWeight: '600', color: d.text },
  chipTextActive: { color: d.canvas },

  stepperRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 12, marginBottom: 14 },
  stepperBtn: { width: 32, height: 32, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  stepperVal: { fontSize: 13.5, fontWeight: '700', color: d.text, minWidth: 100, textAlign: 'center', fontFamily: MONO },

  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 1.5, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: d.line, borderColor: d.line },
  toggleLabel: { fontSize: 13, color: d.text },
  hint: { fontSize: 11.5, color: d.amber, marginTop: 4 },

  itemGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  itemCard: { width: '31%', aspectRatio: 1, borderRadius: 14, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center', gap: 6 },
  itemCardActive: { backgroundColor: d.line, borderColor: d.line },
  itemLabel: { fontSize: 10.5, fontWeight: '600', color: d.text, textAlign: 'center' },
  itemLabelActive: { color: d.canvas },

  volCard: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 14, padding: 14 },
  volHeadRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  volLabel: { fontSize: 10, letterSpacing: 0.5, color: d.textSoft, fontFamily: MONO },
  volValue: { fontSize: 15, fontWeight: '700', color: d.amber, fontFamily: MONO },
  volBarTrack: { height: 8, borderRadius: 4, backgroundColor: d.canvas, overflow: 'hidden', marginBottom: 12 },
  volBarFill: { height: 8, borderRadius: 4 },
  tierRow: { flexDirection: 'row', justifyContent: 'space-between' },
  tierItem: { alignItems: 'center', gap: 3, flex: 1 },
  tierLabel: { fontSize: 8.5, color: d.textSoft, textAlign: 'center' },
  volNote: { fontSize: 10.5, color: d.textSoft, marginTop: 10, textAlign: 'center' },

  routeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 14, padding: 14, marginBottom: 16 },
  routeEnd: { alignItems: 'center', gap: 4, width: 90 },
  routeEndLabel: { fontSize: 10.5, color: d.text, fontFamily: MONO, textAlign: 'center' },
  routeLine: { flex: 1, alignItems: 'center', gap: 6 },
  routeDash: { height: 1, width: '100%' },
  routeKm: { fontSize: 12, fontWeight: '700', color: d.amber, fontFamily: MONO },

  moverCard: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 14, padding: 14, marginBottom: 12 },
  moverCardActive: { borderColor: d.line },
  moverHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  moverName: { fontSize: 14, fontWeight: '700', color: d.text },
  moverSub: { fontSize: 11, color: d.textSoft, marginTop: 1 },
  moverPrice: { fontSize: 17, fontWeight: '700', color: d.text, fontFamily: MONO },
  moverBullets: { gap: 4, paddingLeft: 32 },
  bulletRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bulletText: { fontSize: 11.5, color: d.textSoft },

  helperCard: { marginBottom: 6 },

  matchSection: { marginTop: 6 },
  matchCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 12, marginBottom: 8 },
  matchIcon: { width: 36, height: 36, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  matchName: { fontSize: 13, fontWeight: '700', color: d.text },
  matchMeta: { fontSize: 11, color: d.textSoft, marginTop: 2 },
  matchWarn: { fontSize: 10, color: d.amber, marginTop: 2 },
  matchRating: { fontSize: 11.5, fontWeight: '600', color: d.amber },

  footer: { flexDirection: 'row', gap: 10, paddingHorizontal: 18, paddingVertical: 14, borderTopWidth: 1, borderTopColor: d.lineSoft, backgroundColor: d.panel },
  backBtn: { width: 44, height: 44, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  nextBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: d.line, borderRadius: 10, paddingVertical: 13 },
  nextBtnDisabled: { opacity: 0.5 },
  nextBtnText: { fontSize: 14, fontWeight: '700', color: d.canvas },
  footerHintWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footerHint: { fontSize: 11.5, color: d.textSoft },
});

export default RelocationScreen;
