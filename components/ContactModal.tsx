"use client";

import { useState } from "react";
import { Copy, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Listing } from "@/types";
import { sendMessage } from "@/lib/supabase/messages";
import { useAuth } from "@/lib/auth/AuthContext";
import Link from "next/link";

interface ContactModalProps {
  listing: Listing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({
  listing,
  open,
  onOpenChange,
}: ContactModalProps) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = async () => {
    if (!user) {
      setError("You must be logged in to send messages");
      return;
    }

    if (!listing.host.userId) {
      // Fallback for hosts without user IDs (mock data)
      console.log("Sending message:", message);
      alert("Message sent! (Demo mode - host doesn't have a user account yet)");
      setMessage("");
      onOpenChange(false);
      return;
    }

    setSending(true);
    setError(null);

    const { data, error: sendError } = await sendMessage(
      listing.id,
      listing.host.userId,
      message
    );

    setSending(false);

    if (sendError) {
      setError(sendError.message || "Failed to send message");
      return;
    }

    // Success!
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact {listing.host.name}</DialogTitle>
          <DialogDescription>
            They prefer:{" "}
            {listing.contactMethod === "in_app"
              ? "In-app message"
              : listing.contactMethod === "email"
              ? "Email"
              : "Phone"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {listing.contactMethod === "in_app" ? (
            <>
              {!user ? (
                <div className="text-center py-4">
                  <p className="text-slate-600 mb-4">
                    You need to be logged in to send messages
                  </p>
                  <Button asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Write your message
                    </label>
                    <Textarea
                      placeholder="Hi! I'm interested in your space for May-August. Is it still available?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      disabled={sending}
                    />
                  </div>
                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                      {error}
                    </div>
                  )}
                  <Button
                    onClick={handleSendMessage}
                    className="w-full bg-uw-red hover:bg-uw-red/90"
                    disabled={!message.trim() || sending}
                  >
                    {sending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </>
              )}
            </>
          ) : listing.contactMethod === "email" ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium">{listing.contactInfo}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(listing.contactInfo || "")}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-medium">{listing.contactInfo}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(listing.contactInfo || "")}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

