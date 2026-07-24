import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const ChatScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const provider = route.params?.provider || { name: 'Rüttenscheider Sanitärtechnik GmbH' };

  const INITIAL_MESSAGES = [
    { id: '1', text: t('chat.sampleMsg1'), sender: 'provider', time: '09:00' },
    { id: '2', text: t('chat.sampleMsg2'), sender: 'user', time: '09:01' },
    { id: '3', text: t('chat.sampleMsg3'), sender: 'provider', time: '09:02' },
  ];

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput]       = useState('');
  const listRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now().toString(), text: input.trim(), sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: t('chat.autoReply'), sender: 'provider', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1200);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
        {!isUser ? (
          <View style={styles.providerAvatar}><Text style={styles.providerAvatarText}>{provider.name.charAt(0)}</Text></View>
        ) : null}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleProvider]}>
          <Text style={[styles.bubbleText, isUser && styles.bubbleTextUser]}>{item.text}</Text>
          <Text style={[styles.bubbleTime, isUser && styles.bubbleTimeUser]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={16} color={d.text} />
        </TouchableOpacity>
        <View style={styles.providerInfo}>
          <View style={styles.headerAvatar}><Text style={styles.headerAvatarText}>{provider.name.charAt(0)}</Text></View>
          <View>
            <Text style={styles.providerName} numberOfLines={1}>{provider.name}</Text>
            <View style={styles.onlineRow}><View style={styles.onlineDot} /><Text style={styles.onlineText}>{t('chat.online').toUpperCase()}</Text></View>
          </View>
        </View>
        <TouchableOpacity style={styles.callBtn}><Ionicons name="call-outline" size={16} color={d.line} /></TouchableOpacity>
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
          <TextInput style={styles.textInput} placeholder={t('chat.placeholder')} placeholderTextColor={d.textSoft} value={input} onChangeText={setInput} multiline />
        </View>
        <TouchableOpacity style={[styles.sendBtn, input.trim() ? styles.sendBtnActive : null]} onPress={sendMessage} disabled={!input.trim()}>
          <Ionicons name="send" size={16} color={input.trim() ? d.canvas : d.textSoft} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (d) => StyleSheet.create({
  container: { flex: 1, backgroundColor: d.canvas },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingBottom: 12, paddingHorizontal: 18, backgroundColor: d.canvas, borderBottomWidth: 1, borderBottomColor: d.lineSoft },
  backBtn: { width: 30, height: 30, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  providerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerAvatar: { width: 38, height: 38, borderRadius: 10, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center' },
  headerAvatarText: { fontSize: 15, fontWeight: '700', color: d.line },
  providerName: { fontSize: 14, fontWeight: '700', color: d.text },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: d.green },
  onlineText: { fontSize: 9, color: d.green, letterSpacing: 0.3 },
  callBtn: { width: 34, height: 34, borderRadius: 9, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  messagesList: { padding: 18, paddingBottom: 8 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 12 },
  messageRowUser: { flexDirection: 'row-reverse' },
  providerAvatar: { width: 28, height: 28, borderRadius: 8, borderWidth: 1, borderColor: d.lineSoft, backgroundColor: d.panel, alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  providerAvatarText: { fontSize: 12, fontWeight: '700', color: d.line },
  bubble: { maxWidth: '75%', borderRadius: 14, padding: 10 },
  bubbleProvider: { backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderBottomLeftRadius: 4, marginLeft: 4 },
  bubbleUser: { backgroundColor: d.line, borderBottomRightRadius: 4 },
  bubbleText: { fontSize: 13.5, color: d.text, lineHeight: 20 },
  bubbleTextUser: { color: d.canvas },
  bubbleTime: { fontSize: 9.5, color: d.textSoft, marginTop: 3, textAlign: 'right' },
  bubbleTimeUser: { color: d.canvas, opacity: 0.7 },
  inputBar: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 18, paddingVertical: 12, backgroundColor: d.canvas, borderTopWidth: 1, borderTopColor: d.lineSoft, gap: 10 },
  inputWrap: { flex: 1, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, maxHeight: 100 },
  textInput: { fontSize: 13.5, color: d.text },
  sendBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: d.panel, borderWidth: 1, borderColor: d.lineSoft, alignItems: 'center', justifyContent: 'center' },
  sendBtnActive: { backgroundColor: d.line, borderColor: d.line },
});

export default ChatScreen;
