import {DeviceInfo} from '@typed/device';
import {create} from 'zustand';

export type DeviceState = {
  device: DeviceInfo | null;
  setDevice: (device: DeviceInfo) => void;
};

export const deviceStore = create<DeviceState>(set => {
  return {
    device: null,
    setDevice: (device: DeviceInfo) => set({device}),
  };
});
