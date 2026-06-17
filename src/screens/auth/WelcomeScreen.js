import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/common';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const { height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <LinearGradient colors={[colors.primary.main, colors.primary.light]} style={styles.topSection}>
      <View style={styles.logoRow}>
        <View style={styles.logoBox}><Text style={styles.logoLetter}>H</Text></View>
        <View>
          <Text style={styles.brandText}>HomeServices</Text>
          <Text style={styles.tagline}>Willkommen zurück!</Text>
        </View>
      </View>

      <View style={styles.cards}>
        {[
          { icon: 'hammer', label: 'Schreiner',  pos: { top: 10, left: 30 } },
          { icon: 'flash',  label: 'Elektriker', pos: { top: 10, right: 30 } },
          { icon: 'water',  label: 'Klempner',   pos: { bottom: 20, left: '35%' } },
        ].map((c, i) => (
          <View key={i} style={[styles.floatingCard, c.pos]}>
            <Ionicons name={c.icon} size={28} color={colors.accent.main} />
            <Text style={styles.cardLabel}>{c.label}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>

    <View style={styles.bottomSection}>
      <Text style={styles.subtitle}>Finden Sie qualifizierte Fachkräfte in Ihrer Nähe</Text>

      <Button onPress={() => navigation.navigate('Login')} icon="arrow-forward" style={styles.btn}>Anmelden</Button>
      <Button onPress={() => navigation.navigate('Register')} variant="outline" style={styles.btn}>Neues Konto erstellen</Button>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} /><Text style={styles.dividerText}>oder fortfahren mit</Text><View style={styles.dividerLine} />
      </View>

      <View style={styles.socialRow}>
        {['logo-google', 'logo-apple', 'mail'].map((icon, i) => (
          <View key={i} style={styles.socialBtn}><Ionicons name={icon} size={24} color={colors.gray[700]} /></View>
        ))}
      </View>

      <Button onPress={() => navigation.navigate('Home')} variant="ghost">Als Gast fortfahren</Button>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: colors.white },
  topSection:     { height: height * 0.45, borderBottomLeftRadius: borderRadius.xl * 2, borderBottomRightRadius: borderRadius.xl * 2, paddingTop: 60, paddingHorizontal: spacing.xl },
  logoRow:        { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginBottom: spacing.xl },
  logoBox:        { width: 60, height: 60, backgroundColor: colors.white, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  logoLetter:     { fontSize: 34, fontWeight: typography.fontWeight.bold, color: colors.accent.main },
  brandText:      { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, color: colors.white },
  tagline:        { fontSize: typography.fontSize.base, color: colors.white, opacity: 0.85 },
  cards:          { flex: 1, position: 'relative' },
  floatingCard:   { position: 'absolute', backgroundColor: colors.white, borderRadius: borderRadius.md, padding: spacing.sm, alignItems: 'center', ...shadows.md },
  cardLabel:      { fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.medium, color: colors.gray[700], marginTop: 4 },
  bottomSection:  { flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.xl },
  subtitle:       { fontSize: typography.fontSize.base, color: colors.gray[600], textAlign: 'center', marginBottom: spacing.xl },
  btn:            { marginBottom: spacing.md },
  dividerRow:     { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md },
  dividerLine:    { flex: 1, height: 1, backgroundColor: colors.gray[200] },
  dividerText:    { fontSize: typography.fontSize.sm, color: colors.gray[500], marginHorizontal: spacing.md },
  socialRow:      { flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginBottom: spacing.lg },
  socialBtn:      { width: 56, height: 56, borderRadius: borderRadius.md, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center', ...shadows.sm },
});

export default WelcomeScreen;
