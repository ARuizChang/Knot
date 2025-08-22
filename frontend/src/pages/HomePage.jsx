import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import NoChatSelected from '../components/NoChatSelected';

const ChatPage = () => {
  const { selectedUser, messages, users } = useChatStore();

  return (
    <div className="h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-[var(--color-card)] rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatWindow />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;