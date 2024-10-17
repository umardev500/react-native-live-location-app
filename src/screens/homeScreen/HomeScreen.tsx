import {HomeHeader, MapView} from '@components/organisms';
import {StatusBar} from 'react-native';

export const HomeScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <HomeHeader />
      {/* Mapview */}
      <MapView />
    </>
  );
};
