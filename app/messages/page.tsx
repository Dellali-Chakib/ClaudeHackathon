"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Loader2, Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Conversation } from "@/types";
import { getUserConversations, subscribeToConversations } from "@/lib/supabase/messages";
import { useAuth } from "@/lib/auth/AuthContext";
import MessageThread from "@/components/MessageThread";
import { mockListings } from "@/lib/mockData";
import Link from "next/link";

export default function MessagesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await getUserConversations();
      if (data && !error) {
        setConversations(data);
      }
      setLoading(false);
    };

    if (user) {
      loadConversations();
    }
  }, [user]);

  // Subscribe to conversation updates
  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToConversations(async () => {
      // Refresh conversations when any message changes
      const { data } = await getUserConversations();
      if (data) {
        setConversations(data);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const getOtherUserId = (conversation: Conversation) => {
    return conversation.sender_id === user?.id
      ? conversation.receiver_id
      : conversation.sender_id;
  };

  const getListingInfo = (listingId: string) => {
    const listing = mockListings.find((l) => l.id === listingId);
    return {
      title: listing?.title || "Unknown Listing",
      host: listing?.host || { name: "Unknown User", avatar: "/placeholder-avatar.png" },
    };
  };

  const getOtherUserInfo = (conversation: Conversation) => {
    const listingInfo = getListingInfo(conversation.listing_id);
    // In a real app, you'd fetch user info from the database
    // For now, we'll use the listing host info
    const otherUserId = getOtherUserId(conversation);
    return {
      id: otherUserId,
      name: listingInfo.host.name,
      avatar: listingInfo.host.avatar,
    };
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-uw-red" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <MessageCircle className="h-8 w-8 text-uw-red" />
            <h1 className="text-3xl font-bold">Messages</h1>
          </div>
          <p className="text-slate-600">
            Communicate with hosts about their listings
          </p>
        </div>

        {/* Conversations List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-uw-red" />
          </div>
        ) : conversations.length === 0 ? (
          <Card className="p-12 text-center">
            <Inbox className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
            <p className="text-slate-600 mb-6">
              Start a conversation by contacting a host on their listing page
            </p>
            <Button asChild className="bg-uw-red hover:bg-uw-red/90">
              <Link href="/browse">Browse Listings</Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {conversations.map((conversation) => {
              const otherUser = getOtherUserInfo(conversation);
              const listingInfo = getListingInfo(conversation.listing_id);

              return (
                <Card
                  key={conversation.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={otherUser.avatar}
                      alt={otherUser.name}
                      className="h-12 w-12 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{otherUser.name}</h3>
                        <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                          {new Date(conversation.last_message_at).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 truncate mb-2">
                        {listingInfo.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500 truncate flex-1">
                          {conversation.last_message}
                        </p>
                        {conversation.unread_count > 0 && (
                          <Badge className="bg-uw-red ml-2 flex-shrink-0">
                            {conversation.unread_count}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Message Thread Dialog */}
        {selectedConversation && (
          <Dialog
            open={!!selectedConversation}
            onOpenChange={(open) => !open && setSelectedConversation(null)}
          >
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Message Thread</DialogTitle>
              </DialogHeader>
              <MessageThread
                listingId={selectedConversation.listing_id}
                listingTitle={getListingInfo(selectedConversation.listing_id).title}
                otherUserId={getOtherUserId(selectedConversation)}
                otherUserName={getOtherUserInfo(selectedConversation).name}
                otherUserAvatar={getOtherUserInfo(selectedConversation).avatar}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
