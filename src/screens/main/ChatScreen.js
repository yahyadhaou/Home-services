import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { messageService } from '../../services';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n';
import { useTheme } from '../../constants/ThemeContext';

const ChatScreen = ({ navigation, route }) => {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const { user } = useApp();
  const d = colors.dispatch;
  const insets = useSafeAreaInsets();
  const styles = createStyles(d);
  const provider = route.params?.provider || {};
  const conversationId = route.params?.conversationId;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  const load = useCallback(() => {
    if (!conversationId) { setLoading(false); return; }
    messageService.listMessages(conversationId, user?.id).then((res) => {
      if (res.success) setMessages(res.messages);
      setLoading(false);
    });
  }, [conversationId, user?.id]);

  useEffect(() => { load(); }, [load]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !conversationId || sending) return;
    setSending(true);
    setInput('');
    const res = await messageService.sendMessage(conversationId, text, user?.id);
    if (res.success) setMessages((prev) => [...prev, res.message]);
    setSending(false);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
        {!isUser ? (
          <View style={styles.providerAvatar}><Text style={styles.providerAvatarText}>{(provider.name || '?').charAt(0)}</Text></View>
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
          <View style={styles.headerAvatar}><Text style={styles.headerAvatarText}>{(provider.name || '?').charAt(0)}</Text></View>
          <Text style={styles.providerName} numberOfLines={1}>{provider.name || t('chat.unknownProvider')}</Text>
        </View>
      </View>

      {!conversationId ? (
        <View style={styles.unavailableBox}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color={d.textSoft} />
          <Text style={styles.unavailableText}>{t('chat.notAvailableYet')}</Text>
        </View>
      ) : loading ? (
        <View style={styles.loadingBox}><ActivityIndicator color={d.line} size="large" /></View>
      ) : (
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />
      )}

      <View style={styles.inputBar}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.textInput}
            placeholder={t('chat.placeholder')}
            placeholderTextColor={d.textSoft}
            value={input}
            onChangeText={setInput}
            multiline
            editable={!!conversationId}
          />
        </View>
        <TouchableOpacity style={[styles.sendBtn, input.trim() && conversationId ? styles.sendBtnActive : null]} onPress={sendMessage} disabled={!input.trim() || !conversationId || sending}>
          <Ionicons name="send" size={16} color={input.trim() && conversationId ? d.canvas : d.textSoft} />
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
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  unavailableBox: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: 40 },
  unavailableText: { fontSize: 13, color: d.textSoft, textAlign: 'center' },
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
