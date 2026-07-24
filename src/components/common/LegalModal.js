import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../constants/ThemeContext';
import { useLanguage } from '../../i18n';

const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' });

// Renders either the Terms of Service or Privacy Policy as a full-screen
// readable popup. Content is placeholder/template legal text meant to prove
// out the UI — it has NOT been reviewed by a lawyer and must not be shipped
// to real users as-is (see the draft banner rendered below).
const LegalModal = ({ visible, onClose, doc }) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);

  if (!doc) return null;
  const content = t(`legal.${doc}`);
  if (!content || typeof content !== 'object') return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.updated}>{content.updated}</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={18} color={d.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.draftBanner}>
          <Ionicons name="warning-outline" size={14} color={d.amber} />
          <Text style={styles.draftText}>{t('legal.draftNotice')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {(content.sections || []).map((s, i) => (
            <View key={i} style={styles.section}>
              <Text style={styles.sectionHeading}>{s.heading}</Text>
              <Text style={styles.sectionBody}>{s.body}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingHorizontal: 18, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  headerText: { flex: 1, paddingRight: 12 },
  title: { fontSize: 18, fontWeight: '700', color: d.text, fontFamily: MONO },
  updated: { fontSize: 11, color: d.textSoft, marginTop: 3 },
  closeBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  draftBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: `${d.amber}1F`, borderBottomWidth: 1, borderBottomColor: d.lineSoft, paddingHorizontal: 18, paddingVertical: 10 },
  draftText: { flex: 1, fontSize: 11.5, color: d.amber, lineHeight: 16 },
  scrollContent: { padding: 18, paddingBottom: 48 },
  section: { marginBottom: 20 },
  sectionHeading: { fontSize: 13.5, fontWeight: '700', color: d.line, fontFamily: MONO, marginBottom: 6 },
  sectionBody: { fontSize: 13, color: d.text, lineHeight: 20 },
});

export default LegalModal;
