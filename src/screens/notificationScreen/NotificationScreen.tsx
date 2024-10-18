import {NotificationList} from '@components/organisms';
import {NotificationHeader} from '@components/organisms/header/NotificationHeader';
import {API} from '@env';
import {mmkvStorage} from '@storage/mmkv';
import {NotifState, notifStore} from '@store/notifStore';
import {Notification, NotificationResponse} from '@typed/notif';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const NotificationScreen = () => {
  const [notification, setNotification] = useState<Notification[]>([]);
  const token = useMMKVStorage('token', mmkvStorage);
  const setNotif = notifStore((state: NotifState) => state.setNotif);

  // clear notif
  useEffect(() => {
    setNotif(false);
  }, []);

  const fetchNotifications = async () => {
    const url = API + '/get-notif';

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token[0],
        },
      });

      const json: NotificationResponse = await response.json();
      setNotification(json.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const insets = useSafeAreaInsets();
  const containerStyle = {
    paddingBottom: insets.bottom,
  };

  return (
    <>
      <NotificationHeader />
      <View className="flex-1 bg-white" style={containerStyle}>
        <NotificationList data={notification} />
      </View>
    </>
  );
};
