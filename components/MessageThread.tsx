"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { Message } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  getConversationMessages,
  sendMessage,
  markMessagesAsRead,
  subscribeToMessages,
} from "@/lib/supabase/messages";
import { useAuth } from "@/lib/auth/AuthContext";

interface MessageThreadProps {
  listingId: string;
  listingTitle: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
}

export default function MessageThread({
  listingId,
  listingTitle,
  otherUserId,
  otherUserName,
  otherUserAvatar,
}: MessageThreadProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      const { data, error } = await getConversationMessages(listingId, otherUserId);
      if (data && !error) {
        setMessages(data);
        // Mark messages as read
        await markMessagesAsRead(listingId, otherUserId);
      }
      setLoading(false);
    };

    loadMessages();
  }, [listingId, otherUserId]);

  // Subscribe to new messages
  useEffect(() => {
    const unsubscribe = subscribeToMessages(listingId, otherUserId, (message) => {
      setMessages((prev) => [...prev, message]);
      // Mark as read if we're the receiver
      if (message.receiver_id === user?.id) {
        markMessagesAsRead(listingId, otherUserId);
      }
    });

    return () => unsubscribe();
  }, [listingId, otherUserId, user?.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    setSending(true);
    const { data, error } = await sendMessage(listingId, otherUserId, newMessage);

    if (data && !error) {
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    }

    setSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-uw-red" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="border-b p-4 bg-white sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <img
            src={otherUserAvatar}
            alt={otherUserName}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{otherUserName}</h3>
            <p className="text-sm text-slate-600">{listingTitle}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg) => {
            const isCurrentUser = msg.sender_id === user?.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? "bg-uw-red text-white"
                      : "bg-white text-slate-900 border"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isCurrentUser ? "text-red-100" : "text-slate-500"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Type your message... (Press Enter to send)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            disabled={sending}
            className="flex-1 resize-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            className="bg-uw-red hover:bg-uw-red/90"
            size="icon"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
