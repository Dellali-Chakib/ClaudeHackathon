# Supabase Messaging Setup

This guide will help you set up the database tables for the in-app messaging system.

## Database Schema

Run the following SQL in your Supabase SQL Editor:

### 1. Create Messages Table

```sql
-- Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id TEXT NOT NULL,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_listing_id ON public.messages(listing_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 2. Create Conversations View (Virtual Table)

```sql
-- Create a view for conversations (groups messages by listing and participants)
CREATE OR REPLACE VIEW public.conversations AS
SELECT DISTINCT ON (listing_id, least(sender_id, receiver_id), greatest(sender_id, receiver_id))
  id,
  listing_id,
  sender_id,
  receiver_id,
  created_at,
  (
    SELECT content
    FROM public.messages m2
    WHERE m2.listing_id = m1.listing_id
    AND (
      (m2.sender_id = m1.sender_id AND m2.receiver_id = m1.receiver_id)
      OR
      (m2.sender_id = m1.receiver_id AND m2.receiver_id = m1.sender_id)
    )
    ORDER BY m2.created_at DESC
    LIMIT 1
  ) as last_message,
  (
    SELECT created_at
    FROM public.messages m2
    WHERE m2.listing_id = m1.listing_id
    AND (
      (m2.sender_id = m1.sender_id AND m2.receiver_id = m1.receiver_id)
      OR
      (m2.sender_id = m1.receiver_id AND m2.receiver_id = m1.sender_id)
    )
    ORDER BY m2.created_at DESC
    LIMIT 1
  ) as last_message_at,
  (
    SELECT COUNT(*)
    FROM public.messages m2
    WHERE m2.listing_id = m1.listing_id
    AND m2.receiver_id = auth.uid()
    AND m2.read = false
    AND (
      (m2.sender_id = m1.sender_id AND m2.receiver_id = m1.receiver_id)
      OR
      (m2.sender_id = m1.receiver_id AND m2.receiver_id = m1.sender_id)
    )
  ) as unread_count
FROM public.messages m1
ORDER BY
  listing_id,
  least(sender_id, receiver_id),
  greatest(sender_id, receiver_id),
  created_at DESC;
```

### 3. Set Up Row Level Security (RLS)

```sql
-- Enable RLS on messages table
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view messages they sent or received
CREATE POLICY "Users can view their own messages"
  ON public.messages
  FOR SELECT
  USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id
  );

-- Policy: Users can insert messages where they are the sender
CREATE POLICY "Users can send messages"
  ON public.messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id
  );

-- Policy: Users can update messages they received (to mark as read)
CREATE POLICY "Users can mark received messages as read"
  ON public.messages
  FOR UPDATE
  USING (
    auth.uid() = receiver_id
  )
  WITH CHECK (
    auth.uid() = receiver_id
  );

-- Policy: Users can delete their own sent messages
CREATE POLICY "Users can delete their sent messages"
  ON public.messages
  FOR DELETE
  USING (
    auth.uid() = sender_id
  );
```

### 4. Set Up Realtime (Optional but Recommended)

To enable real-time updates for messages:

1. Go to **Database** → **Replication** in your Supabase dashboard
2. Enable replication for the `messages` table
3. This allows the app to receive instant updates when new messages arrive

Alternatively, run this SQL:

```sql
-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
```

## Testing the Setup

After running the SQL above, you can test it:

```sql
-- Test inserting a message (replace UUIDs with actual user IDs from auth.users)
INSERT INTO public.messages (listing_id, sender_id, receiver_id, content)
VALUES (
  '1',
  'your-user-id-here',
  'another-user-id-here',
  'Hi! Is this still available?'
);

-- Test querying messages
SELECT * FROM public.messages;

-- Test querying conversations
SELECT * FROM public.conversations;
```

## Security Notes

1. **Row Level Security (RLS)** ensures users can only see messages they're involved in
2. Users can only send messages as themselves (sender_id must match auth.uid())
3. Users can only mark messages as read if they're the receiver
4. The conversations view automatically filters to show only relevant conversations

## Next Steps

After setting up the database:

1. The app will automatically use these tables
2. Messages sent through the ContactModal will be saved to the database
3. Users can view their conversations at `/messages`
4. Unread message counts will appear in the navbar

## Troubleshooting

### "permission denied for table messages"
- Make sure you've enabled RLS and created the policies
- Check that you're logged in (auth.uid() must return a value)

### Messages not appearing in real-time
- Enable replication for the messages table
- Check browser console for WebSocket connection errors

### Can't query conversations view
- Make sure the view was created successfully
- The view requires at least one message to exist in the messages table
