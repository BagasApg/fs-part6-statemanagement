import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setNotification: message => set(() => ({ notification: message }))
  }
}))

export const useNotifications = () => useNotificationStore(state => state.notification)
export const useNotificationsActions = () => useNotificationStore(state => state.actions)
