import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const { width, height } = Dimensions.get('window');
const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const OnboardingScreen = ({ navigation }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const slides = [
    { id: '1', code: '01/SPD', title: t('onboarding.slide1Title'), description: t('onboarding.slide1Desc'), icon: 'hammer-outline' },
    { id: '2', code: '02/AVL', title: t('onboarding.slide2Title'), description: t('onboarding.slide2Desc'), icon: 'flash-outline' },
    { id: '3', code: '03/SEC', title: t('onboarding.slide3Title'), description: t('onboarding.slide3Desc'), icon: 'shield-checkmark-outline' },
    { id: '4', code: '04/SOS', title: t('onboarding.slide4Title'), description: t('onboarding.slide4Desc'), icon: 'alert-circle-outline' },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Welcome');
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index ?? 0);
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.skipBtn, { top: insets.top + 16 }]} onPress={() => navigation.replace('Welcome')}>
        <Text style={styles.skipText}>{t('onboarding.skip')}</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon} size={64} color={d.line} />
              <Text style={styles.iconCode}>{item.code}</Text>
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDesc}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>{currentIndex === slides.length - 1 ? t('onboarding.getStarted') : t('onboarding.next')}</Text>
          <Ionicons name="arrow-forward" size={18} color={d.canvas} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (d) => StyleSheet.create({
  container:  { flex: 1, backgroundColor: d.canvas },
  skipBtn:    { position: 'absolute', top: 60, right: 24, zIndex: 10, padding: 8 },
  skipText:   { fontSize: 14, fontWeight: '500', color: d.textSoft },
  slide:      { width, height: height * 0.72, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30 },
  iconCircle: { width: 148, height: 148, borderRadius: 20, borderWidth: 1.5, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center', marginBottom: 30, gap: 8 },
  iconCode:   { fontSize: 11, letterSpacing: 0.6, color: d.line, fontFamily: MONO },
  slideTitle: { fontSize: 24, fontWeight: '700', color: d.text, textAlign: 'center', marginBottom: 12 },
  slideDesc:  { fontSize: 14, color: d.textSoft, textAlign: 'center', lineHeight: 22 },
  footer:     { position: 'absolute', bottom: 70, width: '100%', alignItems: 'center', paddingHorizontal: 24 },
  pagination: { flexDirection: 'row', marginBottom: 22 },
  dot:        { width: 6, height: 6, borderRadius: 3, backgroundColor: d.lineSoft, marginHorizontal: 3 },
  dotActive:  { width: 20, backgroundColor: d.line },
  nextBtn:    { flexDirection: 'row', backgroundColor: d.line, paddingVertical: 14, paddingHorizontal: 26, borderRadius: 12, alignItems: 'center', gap: 8 },
  nextText:   { fontSize: 15, fontWeight: '700', color: d.canvas },
});

export default OnboardingScreen;
