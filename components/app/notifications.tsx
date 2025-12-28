import React, { useState } from 'react';
import { 
  Settings, 
  Check, 
  BookOpen, 
  Star, 
  ShieldAlert, 
  MailOpen 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
  // Mock Data for the populated state
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'milestone',
      title: '3 Day Streak!',
      description: 'You have written for 3 consecutive days.',
      date: '2h ago',
      read: false,
      icon: <Star size={16} className="text-yellow-600" />,
      bg: 'bg-yellow-50',
    },
    {
      id: 2,
      type: 'system',
      title: 'New: Audio Entries',
      description: 'Record thoughts directly into your daily log.',
      date: '1d ago',
      read: true,
      icon: <BookOpen size={16} className="text-zinc-600" />,
      bg: 'bg-zinc-100',
    },
    {
      id: 3,
      type: 'security',
      title: 'Login attempt',
      description: 'We detected a login from Chrome on Windows.',
      date: 'Dec 12',
      read: true,
      icon: <ShieldAlert size={16} className="text-red-600" />,
      bg: 'bg-red-50',
    },
    {
      id: 4,
      type: 'system',
      title: 'New: Audio Entries',
      description: 'Record thoughts directly into your daily log.',
      date: '2d ago',
      read: true,
      icon: <BookOpen size={16} className="text-zinc-600" />,
      bg: 'bg-zinc-100',
    },
    {
      id: 5,
      type: 'security',
      title: 'Login attempt',
      description: 'We detected a login from Chrome on Windows.',
      date: 'Dec 10',
      read: true,
      icon: <ShieldAlert size={16} className="text-red-600" />,
      bg: 'bg-red-50',
    },
    {
      id: 6,
      type: 'system',
      title: 'New: Audio Entries',
      description: 'Record thoughts directly into your daily log.',
      date: '1d ago',
      read: true,
      icon: <BookOpen size={16} className="text-zinc-600" />,
      bg: 'bg-zinc-100',
    },
    {
      id: 7,
      type: 'security',
      title: 'Login attempt',
      description: 'We detected a login from Chrome on Windows.',
      date: 'Dec 12',
      read: true,
      icon: <ShieldAlert size={16} className="text-red-600" />,
      bg: 'bg-red-50',
    },
  ]);

  const [filter, setFilter] = useState('all'); // 'all' or 'unread'

  const handleClearAll = () => {
    setNotifications([]);
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  return (
    <div className="w-full md:w-[400px]">
      
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <h1 className="text-lg font-serif font-medium text-zinc-900">Notifications</h1>
        
        <div className="flex gap-1">
           <button 
              onClick={markAllRead}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-full transition-colors" 
              title="Mark all as read"
           >
              <Check size={18} />
           </button>
           <button 
              className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 rounded-full transition-colors"
              title="Settings"
           >
              <Settings size={18} />
           </button>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between px-4 pb-3 border-b border-zinc-100 shrink-0">
          <div className="flex gap-4">
              <button 
                  onClick={() => setFilter('all')}
                  className={`text-xs font-medium transition-colors ${filter === 'all' ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                  All
              </button>
              <button 
                  onClick={() => setFilter('unread')}
                  className={`text-xs font-medium transition-colors ${filter === 'unread' ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                  Unread
              </button>
          </div>
          {notifications.length > 0 && (
            <button onClick={handleClearAll} className="text-xs text-zinc-400 hover:text-red-500 transition-colors">
                Clear
            </button>
          )}
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-[300px] md:max-h-[40vh]">
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((note) => (
              <NotificationCard key={note.id} note={note} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center h-full"
            >
              <div className="h-16 w-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
                  <MailOpen size={24} className="text-zinc-300" />
              </div>
              <p className="text-zinc-500 text-sm">No new notifications</p>
              <button 
                  onClick={() => console.log('Refresh clicked')} 
                  className="mt-4 text-xs font-medium text-yellow-600 hover:text-yellow-700"
              >
                  Refresh
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

interface Notification {
  id: number;
  type: 'milestone' | 'system' | 'security';
  title: string;
  description: string;
  date: string;
  read: boolean;
  icon: React.ReactNode;
  bg: string;
}

// Compact Notification Card
const NotificationCard = ({ note }:{note: Notification}) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className={`group relative p-3 rounded-xl border transition-colors duration-200 cursor-default
        ${note.read 
            ? 'bg-white border-transparent hover:bg-zinc-50' 
            : 'bg-zinc-50/80 border-zinc-100'
        }`}
  >
    <div className="flex gap-3 items-start">
        <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${note.bg}`}>
            {note.icon}
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-0.5">
                <h4 className={`text-sm font-medium leading-none ${note.read ? 'text-zinc-700' : 'text-zinc-900'}`}>
                    {note.title}
                </h4>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-400 whitespace-nowrap">{note.date}</span>
                    {!note.read && (
                        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 block"></span>
                    )}
                </div>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                {note.description}
            </p>
        </div>
    </div>
  </motion.div>
);

export default Notifications;