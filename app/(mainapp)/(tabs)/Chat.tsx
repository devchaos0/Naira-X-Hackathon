import CustomText from "@/app/shared/text/CustomText";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const messages = [
  {
    id: "1",
    text: "Hi Aisha, I’m sending ₦15,000 for the event tonight.",
    time: "08:06",
    sender: "me",
  },
  {
    id: "2",
    text: "Great, I’ve received it. Please send to my new account number if possible.",
    time: "08:08",
    sender: "them",
  },
  {
    id: "3",
    text: "Sure — sending now. Transaction ID will appear right after.",
    time: "08:09",
    sender: "me",
  },
  {
    id: "4",
    text: "Payment complete! Check the receipt for details.",
    time: "08:11",
    sender: "them",
  },
];

const ChatBubble = ({
  text,
  time,
  sender,
}: {
  text: string;
  time: string;
  sender: string;
}) => {
  const isMe = sender === "me";

  return (
    <View
      style={[
        styles.messageRow,
        isMe ? styles.messageRowRight : styles.messageRowLeft,
      ]}
    >
      <View
        style={[styles.bubble, isMe ? styles.bubbleRight : styles.bubbleLeft]}
      >
        <CustomText
          variant="body"
          color={isMe ? Colors.light.white : Colors.light.baseblack}
        >
          {text}
        </CustomText>
        <CustomText
          variant="caption"
          color={isMe ? Colors.light.grey100 : Colors.light.text2}
          style={styles.timeText}
        >
          {time}
        </CustomText>
      </View>
    </View>
  );
};

const Chat = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <View>
          <CustomText variant="h4" bold color={Colors.light.baseblack}>
            Money Chat
          </CustomText>
          <CustomText variant="caption" color={Colors.light.text2}>
            Send money with live conversation
          </CustomText>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
            <Ionicons name="person-circle" size={24} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>
      </View>

     

      <ScrollView
        contentContainerStyle={styles.messageContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <ChatBubble key={message.id} {...message} />
        ))}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          placeholder="Request or send money"
          placeholderTextColor={Colors.light.text2}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
          <Ionicons name="send" size={20} color={Colors.light.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerIcons: {
    flexDirection: "row",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    backgroundColor: Colors.light.white,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 4,
  },
  statusBadge: {
    backgroundColor: Colors.light.lightgold,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  messageContainer: {
    paddingBottom: 20,
  },
  messageRow: {
    marginBottom: 14,
    flexDirection: "row",
  },
  messageRowLeft: {
    justifyContent: "flex-start",
  },
  messageRowRight: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "78%",
    padding: 16,
    borderRadius: 20,
  },
  bubbleLeft: {
    backgroundColor: Colors.light.white,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bubbleRight: {
    backgroundColor: Colors.light.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  timeText: {
    marginTop: 8,
    textAlign: "right",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.white,
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: Colors.light.baseblack,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    color: Colors.light.baseblack,
    fontFamily: "OpenSans-Regular",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default Chat;
