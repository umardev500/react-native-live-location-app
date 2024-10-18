import {NotificationList} from '@components/organisms';
import {NotificationHeader} from '@components/organisms/header/NotificationHeader';
import {API} from '@env';
import {mmkvStorage} from '@storage/mmkv';
import {NotifState, notifStore} from '@store/notifStore';
import {Notification, NotificationResponse} from '@typed/notif';
import {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const dummyNotifications: Notification[] = Array.from(
  {length: 15},
  (_, index) => ({
    id: Math.random(),
    user_id: 100 + (index + 1),
    title: `Notification Title ${index + 1}`,
    message: `This is the message for notification ${index + 1}.`,
    created_at: new Date().toISOString(), // Current timestamp in ISO 8601 format
  }),
);

export const NotificationScreen = () => {
  const [notification, setNotification] = useState<Notification[]>([
    ...dummyNotifications,
  ]);
  const token = useMMKVStorage('token', mmkvStorage);
  const setNotif = notifStore((state: NotifState) => state.setNotif);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      if (!(json.data.next_page_url === null)) {
        setNextPageUrl(`${url}?page=${json.data.current_page + 1}`);
        console.log('has data');
      } else {
        console.log('no data');
      }
      setNotification(prev => [...prev, ...json.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    return () => {
      setNotification([]);
    };
  }, []);

  const insets = useSafeAreaInsets();
  const containerStyle = {
    paddingBottom: insets.bottom,
  };

  const handleReachEnd = () => {
    console.log('reach end');
    if (nextPageUrl) {
      setLoading(true);
      fetchNotifications();
    } else {
      console.log('no more data to fetch');
    }
  };

  return (
    <>
      <NotificationHeader />
      <View className="flex-1 bg-white" style={containerStyle}>
        <NotificationList onReachEnd={handleReachEnd} data={notification} />
        {loading && (
          <View className="py-8">
            <ActivityIndicator color={'#6b7280'} size={'large'} />
          </View>
        )}
      </View>
    </>
  );
};
