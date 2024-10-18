import {API} from '@env';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {mmkvStorage} from '@storage/mmkv';
import {SendLocationResponse} from '@typed/send';
import DeviceInfo from 'react-native-device-info';
import {useMMKVStorage} from 'react-native-mmkv-storage';

export const locationTaskOptions = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

export const useLocationTask = () => {
  const token = useMMKVStorage('token', mmkvStorage);
  // const device = useMMKVStorage('device', mmkvStorage);

  const updateLocation = () => {
    const url = API + '/send-location';

    return new Promise(async (resolve, reject) => {
      try {
        const deviceId = DeviceInfo.getDeviceId();
        const brand = DeviceInfo.getBrand();
        const model = DeviceInfo.getModel();
        const uniqueId = await DeviceInfo.getUniqueId();
        const position: GeolocationResponse = await getCurrentPositionAsync();
        let body: any = {
          deviceid: deviceId,
          brand,
          model,
          uniqueId,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token[0],
          },
          body: JSON.stringify(body),
        });

        const json: SendLocationResponse = await response.json();
        console.log(
          'running in ',
          json.payload.longitude,
          json.payload.latitude,
        );
        setTimeout(() => {
          resolve('done');
        }, (json.interval || 5) * 1000);
      } catch (e) {
        console.log('err', e);
        reject(e);
      }
    });
  };

  const getCurrentPositionAsync = () => {
    return new Promise<GeolocationResponse>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        {enableHighAccuracy: true},
      );
    });
  };

  return async () => {
    // infinity loop with timout come from updatelocation response
    while (true) {
      await updateLocation().catch(() => {});
    }
  };
};
