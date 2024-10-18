import {DeviceState, deviceStore} from '@store/deviceStore';
import {useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';

export const useDeviceInfo = () => {
  const setDeviceInfo = deviceStore((state: DeviceState) => state.setDevice);

  const fetchDeviceInfo = async () => {
    try {
      const deviceId = DeviceInfo.getDeviceId();
      const brand = DeviceInfo.getBrand();
      const model = DeviceInfo.getModel();
      const uniqueId = await DeviceInfo.getUniqueId();

      setDeviceInfo({
        deviceId,
        brand,
        model,
        uniqueId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchDeviceInfo();
  }, []);
};
