import {Header, MapView} from '@components/organisms';
import {StatusBar} from 'react-native';

export const HomeScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Header />
      {/* Mapview */}
      <MapView />
    </>
  );
};
