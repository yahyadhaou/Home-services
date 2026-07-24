import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { providerService } from '../../services';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const CATEGORY_ICON = {
  Klempner: 'water', Elektriker: 'flash', Reinigung: 'sparkles', Heizung: 'thermometer',
  Maler: 'color-palette', Schreiner: 'hammer', Gärtner: 'leaf', Umzug: 'car',
};

const NearbyScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const [providers, setProviders] = useState([]);
  const [center, setCenter] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    providerService.getNearby().then((res) => {
      if (res.success) { setProviders(res.providers); setCenter(res.center); }
    });
  }, []);

  const sorted = [...providers].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  const selected = providers.find((p) => p.id === selectedId);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.head}>
        <Text style={styles.title}>{t('nearby.title')}</Text>
        <Text style={styles.subtitle}>{t('nearby.subtitle', { count: providers.length })}</Text>
      </View>

      <View style={styles.mapWrap}>
        <View style={styles.mapTagRow}>
          <View style={styles.mapTag}><View style={styles.blinkDot} /><Text style={styles.mapTagText}>{t('nearby.live').toUpperCase()}</Text></View>
          <Text style={styles.mapCenterLabel}>{center?.label}</Text>
        </View>
        <View style={styles.mapField}>
          {center ? (
            <View style={[styles.centerPin, { left: `${center.x}%`, top: `${center.y}%` }]}>
              <View style={styles.centerDot} />
            </View>
          ) : null}
          {providers.map((p) => {
            const isSel = p.id === selectedId;
            return (
              <TouchableOpacity
                key={p.id}
                style={[styles.pin, { left: `${p.mapPos.x}%`, top: `${p.mapPos.y}%` }, isSel && styles.pinActive]}
                onPress={() => setSelectedId(isSel ? null : p.id)}
                activeOpacity={0.8}
              >
                <Ionicons name={CATEGORY_ICON[p.category] || 'business'} size={12} color={isSel ? d.canvas : d.line} />
              </TouchableOpacity>
            );
          })}
        </View>
        {selected ? (
          <TouchableOpacity style={styles.mapCallout} onPress={() => navigation.navigate('ProviderDetail', { provider: selected })} activeOpacity={0.85}>
            <View style={{ flex: 1 }}>
              <Text style={styles.calloutName} numberOfLines={1}>{selected.name}</Text>
              <Text style={styles.calloutMeta}>{selected.district} · {selected.distance} · ★ {selected.rating}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={d.line} />
          </TouchableOpacity>
        ) : (
          <View style={styles.mapHint}><Text style={styles.mapHintText}>{t('nearby.tapPin')}</Text></View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <Text style={styles.listTitle}>{t('nearby.allNearby').toUpperCase()}</Text>
        {sorted.map((p) => (
          <TouchableOpacity key={p.id} style={styles.row} onPress={() => navigation.navigate('ProviderDetail', { provider: p })} activeOpacity={0.8}>
            <View style={styles.rowIcon}><Ionicons name={p.providerType === 'independent' ? 'person-outline' : 'business-outline'} size={18} color={d.line} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowName}>{p.name}</Text>
              <Text style={styles.rowMeta}>{p.category} · {p.district} · {p.distance}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.rowRating}>★ {p.rating}</Text>
              <Text style={styles.rowPrice}>€{p.hourlyRate}/h</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  head: { paddingHorizontal: 18, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700', color: d.text },
  subtitle: { fontSize: 12, color: d.textSoft, marginTop: 2 },

  mapWrap: { marginHorizontal: 18, borderRadius: 16, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, overflow: 'hidden', marginBottom: 14 },
  mapTagRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingTop: 10 },
  mapTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  blinkDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: d.amber },
  mapTagText: { fontSize: 10, letterSpacing: 1, color: d.line, fontFamily: MONO },
  mapCenterLabel: { fontSize: 10.5, color: d.textSoft, fontFamily: MONO },
  mapField: {
    height: 200, margin: 10, borderRadius: 12, position: 'relative', overflow: 'hidden',
    backgroundColor: d.canvas, borderWidth: 1, borderColor: d.lineSoft,
  },
  centerPin: { position: 'absolute', width: 16, height: 16, marginLeft: -8, marginTop: -8, borderRadius: 8, borderWidth: 1.5, borderColor: d.amber, alignItems: 'center', justifyContent: 'center' },
  centerDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: d.amber },
  pin: { position: 'absolute', width: 24, height: 24, marginLeft: -12, marginTop: -12, borderRadius: 7, backgroundColor: d.panel, borderWidth: 1.5, borderColor: d.line, alignItems: 'center', justifyContent: 'center' },
  pinActive: { backgroundColor: d.line },
  mapCallout: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginBottom: 10, backgroundColor: d.canvas, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 10, padding: 10, gap: 8 },
  calloutName: { fontSize: 12.5, fontWeight: '700', color: d.text },
  calloutMeta: { fontSize: 10.5, color: d.textSoft, marginTop: 1, fontFamily: MONO },
  mapHint: { marginHorizontal: 10, marginBottom: 10, alignItems: 'center', paddingVertical: 8 },
  mapHintText: { fontSize: 11, color: d.textSoft },

  list: { paddingHorizontal: 18, paddingBottom: 24 },
  listTitle: { fontSize: 10.5, letterSpacing: 0.5, color: d.textSoft, marginBottom: 10, fontFamily: MONO },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 12, padding: 12, marginBottom: 8, gap: 10 },
  rowIcon: { width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  rowName: { fontSize: 13, fontWeight: '700', color: d.text },
  rowMeta: { fontSize: 11, color: d.textSoft, marginTop: 2 },
  rowRating: { fontSize: 12, fontWeight: '600', color: d.amber },
  rowPrice: { fontSize: 11, color: d.textSoft, marginTop: 2, fontFamily: MONO },
});

export default NearbyScreen;
