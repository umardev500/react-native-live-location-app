import {create} from 'zustand';

export interface NotifState {
  hasNotif: boolean;
  setNotif: (hasNotif: boolean) => void;
}

export const notifStore = create<NotifState>(set => {
  return {
    hasNotif: false,
    setNotif: (hasNotif: boolean) => set({hasNotif}),
  };
});
