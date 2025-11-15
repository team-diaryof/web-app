import { create } from 'zustand'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  duration?: number // in ms, default 5000
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = `${Date.now()}-${Math.random()}`
    const newNotification: Notification = {
      id,
      duration: 100000000,
      ...notification,
    }
    
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }))
    
    // Auto-remove after duration
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      }))
    }, newNotification.duration)
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }))
  },
  
  clearAll: () => {
    set({ notifications: [] })
  },
}))
