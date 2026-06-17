import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Schnelle Handwerker', description: 'Finden Sie qualifizierte Handwerker in Ihrer Nähe innerhalb von Minuten.', icon: 'hammer',           gradient: [colors.primary.main, colors.primary.light] },
  { id: '2', title: 'Sofort verfügbar',     description: 'Echtzeit-Verfügbarkeit und sofortige Buchungsbestätigung.',                icon: 'time',             gradient: [colors.accent.main, colors.accent.dark] },
  { id: '3', title: 'Sichere Zahlung',      description: 'SEPA, Kreditkarte und digitale Zahlungsmethoden – alles sicher.',          icon: 'shield-checkmark', gradient: [colors.secondary.main, colors.secondary.dark] },
  { id: '4', title: 'Notfall-Service',      description: '24/7 Notfall-Unterstützung für dringende Reparaturen zu Hause.',           icon: 'alert-circle',     gradient: [colors.status.error, '#B91C1C'] },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

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
      <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.replace('Welcome')}>
        <Text style={styles.skipText}>Überspringen</Text>
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
          <LinearGradient colors={item.gradient} style={styles.slide}>
            <View style={styles.iconCircle}><Ionicons name={item.icon} size={80} color={colors.white} /></View>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDesc}>{item.description}</Text>
          </LinearGradient>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>{currentIndex === slides.length - 1 ? "Los geht's" : 'Weiter'}</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: colors.white },
  skipBtn:    { position: 'absolute', top: 60, right: spacing.xl, zIndex: 10, padding: spacing.sm },
  skipText:   { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.medium, color: colors.white },
  slide:      { width, height: height * 0.75, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xl },
  iconCircle: { width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  slideTitle: { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold, color: colors.white, textAlign: 'center', marginBottom: spacing.md },
  slideDesc:  { fontSize: typography.fontSize.lg, color: colors.white, textAlign: 'center', opacity: 0.9, lineHeight: 28 },
  footer:     { position: 'absolute', bottom: 80, width: '100%', alignItems: 'center', paddingHorizontal: spacing.xl },
  pagination: { flexDirection: 'row', marginBottom: spacing.xl },
  dot:        { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 4 },
  dotActive:  { width: 24, backgroundColor: colors.accent.main },
  nextBtn:    { flexDirection: 'row', backgroundColor: colors.primary.main, paddingVertical: spacing.md, paddingHorizontal: spacing.xl, borderRadius: borderRadius.full, alignItems: 'center', gap: spacing.sm },
  nextText:   { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semiBold, color: colors.white },
});

export default OnboardingScreen;
