import {useDeviceInfo} from '@hooks/useDeviceInfo';
import {useLocalNotification} from '@hooks/useLocalNotification';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {mmkvStorage} from '@storage/mmkv';
import {NotifState, notifStore} from '@store/notifStore';
import {RootStackParamList} from '@typed/rootStack';
import {useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {HomeScreen, LoginScreen, NotificationScreen} from './screens';
import './styles/global.css';

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  currentPage: React.MutableRefObject<string>;
};
const App = (props: Props) => {
  const {currentPage} = props;

  const displayLocalNotification = useLocalNotification();
  const setNotif = notifStore((state: NotifState) => state.setNotif);

  const [authToken] = useMMKVStorage<string>('token', mmkvStorage);
  const navigation = useNavigation();

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

      if (currentPage.current !== 'Notification') {
        setNotif(true);
      }
    });

    const unsubNotifee = notifee.onForegroundEvent(async ({type}) => {
      if (type === EventType.PRESS) {
        navigation.navigate('Notification');
      }
    });

    // Handle when the app is opened from a background/quit state from a notification
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // Navigate to Notification screen
      navigation.navigate('Notification');
    });

    // Check if the app was opened by a notification when in quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // Navigate to Notification screen
          navigation.navigate('Notification');
        }
      });

    return () => {
      unsubscribe();
      unsubNotifee();
    };
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          const notifGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          console.log('notif:', notifGranted);
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          const grantedCoarse = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          );
          console.log('coarse:', grantedCoarse);

          const grantedFine = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          console.log('fine:', grantedFine);

          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          );
          console.log('bg:', granted);
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
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      {authToken ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const Wrapper = () => {
  const currentPage = useRef('');
  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={async () => {
          const routeName = navigationRef.getCurrentRoute()?.name;
          if (routeName === 'Notification') {
            console.log('current page is notification');
            currentPage.current = 'Notification';
          } else {
            currentPage.current = routeName || '';
          }
        }}>
        <App currentPage={currentPage} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Wrapper;
