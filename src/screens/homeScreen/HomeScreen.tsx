import {HomeHeader, MapView} from '@components/organisms';
import {useSendLocation} from '@hooks/useSendLocation';
import {useNavigation} from '@react-navigation/native';
import Mapbox from '@rnmapbox/maps';
import {Coords} from '@typed/coords';
import {useEffect, useRef, useState} from 'react';
import {StatusBar} from 'react-native';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const coords = useRef<Coords | null>(null);
  const navigation = useNavigation();

  const sendHook = useSendLocation();
  let timeOutId = useRef<NodeJS.Timeout | null>(null);

  const updateLocation = async (coordinate: Coords | null) => {
    if (coordinate === null) {
      console.log('null');
      setTimeout(() => {
        updateLocation(coords.current);
      }, 1000);
      return;
    }

    try {
      const interval = await sendHook(coordinate);
      timeOutId.current = setTimeout(() => {
        console.log(
          `updated in ${(interval || 5) * 1000}ms coords: ${coords.current}`,
        );
        updateLocation(coords.current);
      }, (interval || 5) * 1000);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focussed');
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
      updateLocation(coords.current);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      console.log('blurred');
      if (timeOutId.current) {
        clearTimeout(timeOutId.current);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation]);

  const handleSendLocation = (e: Mapbox.Location) => {
    coords.current = [e.coords.longitude, e.coords.latitude];
  };
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <HomeHeader />
      {/* Mapview */}
      {!loading && <MapView handleUpdate={handleSendLocation} />}
    </>
  );
};
