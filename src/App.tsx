import {useDeviceInfo} from '@hooks/useDeviceInfo';
import {useLocalNotification} from '@hooks/useLocalNotification';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NotifState, notifStore} from '@store/notifStore';
import {RootStackParamList} from '@typed/rootStack';
import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen, LoginScreen, NotificationScreen} from './screens';
import './styles/global.css';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const displayLocalNotification = useLocalNotification();
  const setNotif = notifStore((state: NotifState) => state.setNotif);

  useDeviceInfo();

  useEffect(() => {
    displayLocalNotification({title: 'Hello', body: 'World'});
  }, []);

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => console.log(token));
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      displayLocalNotification({
        title: remoteMessage.notification?.title || '',
        body: remoteMessage.notification?.body || '',
      });

      setNotif(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
        } else {
        }
      } catch (e) {
        console.log(e);
        //
      }
    };

    requestPermissions();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
