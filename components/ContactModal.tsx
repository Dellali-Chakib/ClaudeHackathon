"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = () => {
    // Mock: In real app, this would send the message
    console.log("Sending message:", message);
    alert("Message sent! (This is a demo)");
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
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Write your message
                </label>
                <Textarea
                  placeholder="Hi! I'm interested in your space for May-August. Is it still available?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                className="w-full"
                disabled={!message.trim()}
              >
                Send Message
              </Button>
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

