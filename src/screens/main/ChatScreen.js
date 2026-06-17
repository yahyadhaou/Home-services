import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

const INITIAL_MESSAGES = [
  { id: '1', text: 'Guten Tag! Wie kann ich Ihnen helfen?', sender: 'provider', time: '09:00' },
  { id: '2', text: 'Ich habe ein Problem mit meinem Wasserhahn.', sender: 'user', time: '09:01' },
  { id: '3', text: 'Kein Problem! Wann wäre ein Termin günstig?', sender: 'provider', time: '09:02' },
];

const ChatScreen = ({ navigation, route }) => {
  const provider = route.params?.provider || { name: 'Müller GmbH' };
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput]       = useState('');
  const listRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now().toString(), text: input.trim(), sender: 'user', time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: 'Danke für Ihre Nachricht. Ich melde mich gleich zurück.', sender: 'provider', time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1200);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
        {!isUser ? <View style={styles.providerAvatar}><Text style={styles.providerAvatarText}>{provider.name.charAt(0)}</Text></View> : null}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleProvider]}>
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>{item.text}</Text>
          <Text style={[styles.bubbleTime, isUser && styles.bubbleTimeUser]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={22} color={colors.gray[900]} /></TouchableOpacity>
        <View style={styles.providerInfo}>
          <View style={styles.headerAvatar}><Text style={styles.headerAvatarText}>{provider.name.charAt(0)}</Text></View>
          <View>
            <Text style={styles.providerName}>{provider.name}</Text>
            <View style={styles.onlineRow}><View style={styles.onlineDot} /><Text style={styles.onlineText}>Online</Text></View>
          </View>
        </View>
        <TouchableOpacity style={styles.callBtn}><Ionicons name="call" size={20} color={colors.accent.main} /></TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputBar}>
        <View style={styles.inputWrap}>
          <TextInput style={styles.textInput} placeholder="Nachricht schreiben..." placeholderTextColor={colors.gray[400]} value={input} onChangeText={setInput} multiline />
        </View>
        <TouchableOpacity style={[styles.sendBtn, input.trim() ? styles.sendBtnActive : null]} onPress={sendMessage} disabled={!input.trim()}>
          <Ionicons name="send" size={20} color={input.trim() ? colors.white : colors.gray[400]} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.default },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingBottom: spacing.md, paddingHorizontal: spacing.xl, backgroundColor: colors.white, ...shadows.sm },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center', marginRight: spacing.sm },
  providerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  headerAvatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.accent.main, alignItems: 'center', justifyContent: 'center' },
  headerAvatarText: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.white },
  providerName: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semiBold, color: colors.gray[900] },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.status.success },
  onlineText: { fontSize: typography.fontSize.xs, color: colors.status.success },
  callBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.accent.main + '18', alignItems: 'center', justifyContent: 'center' },
  messagesList: { padding: spacing.xl, paddingBottom: spacing.sm },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: spacing.md },
  messageRowUser: { flexDirection: 'row-reverse' },
  providerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary.main, alignItems: 'center', justifyContent: 'center', marginRight: spacing.xs },
  providerAvatarText: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.bold, color: colors.white },
  bubble: { maxWidth: '75%', borderRadius: borderRadius.lg, padding: spacing.sm },
  bubbleProvider: { backgroundColor: colors.white, borderBottomLeftRadius: 4, ...shadows.sm, marginLeft: spacing.xs },
  bubbleUser: { backgroundColor: colors.accent.main, borderBottomRightRadius: 4 },
  bubbleText: { fontSize: typography.fontSize.base, color: colors.gray[900], lineHeight: 22 },
  bubbleTextUser: { color: colors.white },
  bubbleTime: { fontSize: 10, color: colors.gray[400], marginTop: 3, textAlign: 'right' },
  bubbleTimeUser: { color: 'rgba(255,255,255,0.7)' },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.xl, paddingVertical: spacing.md, backgroundColor: colors.white, gap: spacing.sm, ...shadows.lg },
  inputWrap: { flex: 1, backgroundColor: colors.gray[100], borderRadius: borderRadius.xl, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, maxHeight: 100 },
  textInput: { fontSize: typography.fontSize.base, color: colors.gray[900] },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.gray[200], alignItems: 'center', justifyContent: 'center' },
  sendBtnActive: { backgroundColor: colors.accent.main },
});

export default ChatScreen;
