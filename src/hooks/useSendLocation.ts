import {API} from '@env';
import {mmkvStorage} from '@storage/mmkv';
import {deviceStore} from '@store/deviceStore';
import {Coords} from '@typed/coords';
import {SendLocationResponse} from '@typed/send';
import {useMMKVStorage} from 'react-native-mmkv-storage';

export const useSendLocation = () => {
  const {device} = deviceStore();
  const url = API + '/send-location';
  const token = useMMKVStorage('token', mmkvStorage);

  return async function (coords: Coords) {
    // console.log('loading..');
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token[0],
        },
        body: JSON.stringify({
          brand: device?.brand,
          deviceid: device?.deviceId,
          model: device?.model,
          uniqueId: device?.uniqueId,
          latitude: coords[1].toString(),
          longitude: coords[0].toString(),
        }),
      });

      const json: SendLocationResponse = await response.json();
      return json.interval;
    } catch (error) {
      console.log('error', error);
      return null;
    } finally {
      // console.log('finish send location');
    }
  };
};
