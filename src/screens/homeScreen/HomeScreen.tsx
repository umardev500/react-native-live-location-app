import {HomeHeader, MapView} from '@components/organisms';
import {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <HomeHeader />
      {/* Mapview */}
      {!loading && <MapView />}
    </>
  );
};
