import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatWindow = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { user } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-bg)]">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-bg)]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => {
          const isOwn = message.senderId === user._id;
          return (
            <div
              key={message._id || idx}
              className={`flex items-end ${isOwn ? "justify-end" : "justify-start"}`}
              ref={idx === messages.length - 1 ? messageEndRef : null}
            >

              {!isOwn && (
                <div className="mr-2">
                  <img
                    src={selectedUser.profilePicture || "/avatar.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border border-[var(--color-border)]"
                  />
                </div>
              )}

              <div
                className={`max-w-xs sm:max-w-sm md:max-w-md flex flex-col ${isOwn ? "items-end" : "items-start"
                  }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-lg mb-1 max-w-full border border-[var(--color-border)]"
                  />
                )}
                {message.text && (
                  <div
                    className={`
                      px-3 py-2 rounded-2xl shadow text-[var(--color-text)]
                      ${isOwn ? "bg-[var(--color-accent)] rounded-br-none" : "bg-[var(--color-card)] rounded-bl-none"}
                    `}
                  >
                    <p className="text-sm break-words">{message.text}</p>
                  </div>
                )}
                <time className="text-xs opacity-60 mt-1 text-[var(--color-text)]">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {isOwn && (
                <div className="ml-2">
                  <img
                    src={user.profilePicture || "/avatar.png"}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border border-[var(--color-border)]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatWindow;
