import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Paperclip, MoreVertical, Search, CheckCheck } from 'lucide-react';
import { Avatar } from '../../molecules/AvatarGroup/AvatarGroup';
import { Button } from '../../atoms/Button/Button';
import './ChatHub.scss';

export const ChatHub = ({
  initialChannels = [
    { id: 1, name: 'Alexander Wright', role: 'Developer', unread: 2, status: 'online', avatar: '' },
    { id: 2, name: 'Jane Smith', role: 'Designer', unread: 0, status: 'offline', avatar: '' },
    { id: 3, name: 'Engineering Sync', role: 'Group Chat', unread: 0, status: 'online', isGroup: true, avatar: '' }
  ],
  initialMessages = [
    { id: 1, channelId: 1, sender: 'Alexander Wright', text: 'Hey there! Did the server logs clear?', time: '10:30 AM', mine: false },
    { id: 2, channelId: 1, sender: 'You', text: 'Yes, I committed the migrations and pushed the update.', time: '10:32 AM', mine: true },
    { id: 3, channelId: 1, sender: 'Alexander Wright', text: 'Perfect, I will inspect details on the staging server.', time: '10:33 AM', mine: false }
  ],
  className = '',
  ...props
}) => {
  const [channels, setChannels] = useState(initialChannels);
  const [selectedChannelId, setSelectedChannelId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, selectedChannelId]);

  const activeChannel = channels.find(c => c.id === selectedChannelId);

  const activeMessages = messages.filter(m => m.channelId === selectedChannelId);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      channelId: selectedChannelId,
      sender: 'You',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mine: true
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Clear unreads for active channel
    setChannels(prev =>
      prev.map(c => (c.id === selectedChannelId ? { ...c, unread: 0 } : c))
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const filteredChannels = channels.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`chat-hub-container ${className}`} {...props}>
      {/* 1. Left User/Group Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-search">
          <Search size={16} className="sidebar-search-icon" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sidebar-search-input"
          />
        </div>
        <div className="chat-channels-list">
          {filteredChannels.map((ch) => (
            <div
              key={ch.id}
              onClick={() => setSelectedChannelId(ch.id)}
              className={`channel-item-row ${ch.id === selectedChannelId ? 'is-selected' : ''}`}
            >
              <div className="channel-avatar-wrapper">
                <Avatar name={ch.name} src={ch.avatar} size="md" />
                <span className={`channel-status-dot dot-${ch.status}`} />
              </div>
              <div className="channel-item-text">
                <div className="channel-name-row">
                  <span className="channel-name">{ch.name}</span>
                  {ch.unread > 0 && <span className="channel-unread-badge">{ch.unread}</span>}
                </div>
                <span className="channel-role-sub">{ch.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Right Conversation Window */}
      <div className="chat-messages-pane">
        {activeChannel ? (
          <>
            <div className="chat-pane-header">
              <div className="active-user-details">
                <Avatar name={activeChannel.name} src={activeChannel.avatar} size="md" />
                <div className="active-user-text">
                  <h5 className="active-user-name">{activeChannel.name}</h5>
                  <span className="active-user-status-label">{activeChannel.status}</span>
                </div>
              </div>
              <button className="chat-options-btn">
                <MoreVertical size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="chat-messages-history">
              {activeMessages.map((m) => (
                <div key={m.id} className={`message-bubble-row ${m.mine ? 'row-mine' : 'row-other'}`}>
                  {!m.mine && <Avatar name={m.sender} size="sm" className="message-sender-avatar" />}
                  <div className="message-bubble-content-block">
                    {!m.mine && <span className="message-sender-name">{m.sender}</span>}
                    <div className="message-bubble-text">{m.text}</div>
                    <div className="message-meta-row">
                      <span className="message-time">{m.time}</span>
                      {m.mine && <CheckCheck size={14} className="message-read-receipt" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-panel">
              <button type="button" className="chat-input-attachment-btn">
                <Paperclip size={18} />
              </button>
              <button type="button" className="chat-input-attachment-btn">
                <Image size={18} />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="chat-pane-text-input"
              />
              <Button
                variant="solid"
                onClick={handleSendMessage}
                leftIcon={<Send size={14} />}
                className="chat-send-btn"
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="chat-empty-panel">
            <h4 className="empty-panel-title">No conversations selected</h4>
            <p>Choose an contact from the sidebar list to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatHub;
