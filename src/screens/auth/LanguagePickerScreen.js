import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage, LANGUAGE_OPTIONS } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

const LanguagePickerScreen = ({ navigation }) => {
  const { setLanguage } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) return;
    setLanguage(selected);
    navigation.replace('Onboarding');
  };

  return (
    <View style={[styles.container, { backgroundColor: d.canvas }]}>
      <View style={styles.content}>
        <View style={[styles.logoBox, { borderColor: d.line }]}>
          <Text style={[styles.logoLetter, { color: d.line }]}>H</Text>
        </View>

        <Text style={[styles.eyebrow, { color: d.line }]}>SELECT LANGUAGE</Text>
        <Text style={[styles.title, { color: d.text }]}>Choose your language</Text>
        <Text style={[styles.titleSecondary, { color: d.textSoft }]}>Choisissez votre langue  ·  Wählen Sie Ihre Sprache</Text>

        <View style={styles.optionsWrap}>
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = selected === opt.code;
            return (
              <TouchableOpacity
                key={opt.code}
                style={[styles.optionCard, { backgroundColor: d.panel, borderColor: isSelected ? d.line : d.lineSoft }]}
                onPress={() => setSelected(opt.code)}
                activeOpacity={0.85}
              >
                <Text style={styles.flag}>{opt.flag}</Text>
                <View style={styles.optionTextWrap}>
                  <Text style={[styles.optionLabel, { color: d.text }]}>{opt.native}</Text>
                  <Text style={[styles.optionSub, { color: d.textSoft }]}>{opt.label}</Text>
                </View>
                <View style={[styles.radio, { borderColor: isSelected ? d.line : d.lineSoft, backgroundColor: isSelected ? d.line : 'transparent' }]}>
                  {isSelected ? <Ionicons name="checkmark" size={14} color={d.canvas} /> : null}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: d.line }, !selected && styles.continueBtnDisabled]}
          onPress={handleContinue}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={[styles.continueText, { color: d.canvas }]}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color={d.canvas} />
        </TouchableOpacity>

        <Text style={[styles.footnote, { color: d.textSoft }]}>You can change this later in Settings</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 26 },
  logoBox: { width: 64, height: 64, borderRadius: 16, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 20 },
  logoLetter: { fontSize: 30, fontWeight: '700' },
  eyebrow: { fontSize: 10, letterSpacing: 1, fontFamily: MONO, textAlign: 'center', marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  titleSecondary: { fontSize: 13, textAlign: 'center', marginBottom: 28, marginTop: 4 },
  optionsWrap: { gap: 12, marginBottom: 26 },
  optionCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, borderWidth: 1 },
  flag: { fontSize: 26, marginRight: 14 },
  optionTextWrap: { flex: 1 },
  optionLabel: { fontSize: 15, fontWeight: '700' },
  optionSub: { fontSize: 12, marginTop: 1 },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  continueBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, paddingVertical: 15 },
  continueBtnDisabled: { opacity: 0.4 },
  continueText: { fontSize: 15, fontWeight: '700' },
  footnote: { textAlign: 'center', fontSize: 11, marginTop: 18 },
});

export default LanguagePickerScreen;
