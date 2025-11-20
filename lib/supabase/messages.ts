import { createClient } from './client';
import { Message, Conversation } from '@/types';

/**
 * Send a message to a listing host
 */
export async function sendMessage(
  listingId: string,
  receiverId: string,
  content: string
): Promise<{ data: Message | null; error: Error | null }> {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { data: null, error: new Error('You must be logged in to send messages') };
    }

    // Insert message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        listing_id: listingId,
        sender_id: user.id,
        receiver_id: receiverId,
        content: content.trim(),
        read: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return { data: null, error: new Error('Failed to send message') };
    }

    return { data, error: null };
  } catch (err) {
    console.error('Unexpected error sending message:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Get all messages for a specific conversation
 */
export async function getConversationMessages(
  listingId: string,
  otherUserId: string
): Promise<{ data: Message[] | null; error: Error | null }> {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { data: null, error: new Error('You must be logged in to view messages') };
    }

    // Get messages between current user and other user for this listing
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('listing_id', listingId)
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return { data: null, error: new Error('Failed to load messages') };
    }

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Unexpected error fetching messages:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Get all conversations for the current user
 */
export async function getUserConversations(): Promise<{
  data: Conversation[] | null;
  error: Error | null
}> {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { data: null, error: new Error('You must be logged in to view conversations') };
    }

    // Get conversations where user is sender or receiver
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return { data: null, error: new Error('Failed to load conversations') };
    }

    return { data: data || [], error: null };
  } catch (err) {
    console.error('Unexpected error fetching conversations:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(
  listingId: string,
  senderId: string
): Promise<{ error: Error | null }> {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { error: new Error('You must be logged in') };
    }

    // Mark all unread messages from senderId to current user as read
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('listing_id', listingId)
      .eq('sender_id', senderId)
      .eq('receiver_id', user.id)
      .eq('read', false);

    if (error) {
      console.error('Error marking messages as read:', error);
      return { error: new Error('Failed to mark messages as read') };
    }

    return { error: null };
  } catch (err) {
    console.error('Unexpected error marking messages as read:', err);
    return { error: err as Error };
  }
}

/**
 * Get total unread message count for current user
 */
export async function getUnreadMessageCount(): Promise<{
  count: number;
  error: Error | null
}> {
  try {
    const supabase = createClient();

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { count: 0, error: new Error('You must be logged in') };
    }

    // Count unread messages where current user is receiver
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', user.id)
      .eq('read', false);

    if (error) {
      console.error('Error getting unread count:', error);
      return { count: 0, error: new Error('Failed to get unread count') };
    }

    return { count: count || 0, error: null };
  } catch (err) {
    console.error('Unexpected error getting unread count:', err);
    return { count: 0, error: err as Error };
  }
}

/**
 * Subscribe to new messages in real-time
 */
export function subscribeToMessages(
  listingId: string,
  otherUserId: string,
  onNewMessage: (message: Message) => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel(`messages:${listingId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `listing_id=eq.${listingId}`,
      },
      (payload) => {
        const newMessage = payload.new as Message;
        // Only notify if message is part of this conversation
        if (
          (newMessage.sender_id === otherUserId || newMessage.receiver_id === otherUserId)
        ) {
          onNewMessage(newMessage);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to conversation updates in real-time
 */
export function subscribeToConversations(
  onConversationUpdate: () => void
) {
  const supabase = createClient();

  const channel = supabase
    .channel('conversations')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'messages',
      },
      () => {
        // Whenever any message changes, refresh conversations
        onConversationUpdate();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
