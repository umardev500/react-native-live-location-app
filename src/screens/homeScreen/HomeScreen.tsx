import {HomeHeader, MapView} from '@components/organisms';
import {locationTaskOptions, useLocationTask} from '@hooks/useLocationTask';
import Mapbox from '@rnmapbox/maps';
import {Coords} from '@typed/coords';
import {useEffect, useRef, useState} from 'react';
import {StatusBar} from 'react-native';
import BackgroundService from 'react-native-background-actions';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const coords = useRef<Coords | null>(null);

  const locationService = useLocationTask();

  useEffect(() => {
    BackgroundService.start(locationService, locationTaskOptions);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
