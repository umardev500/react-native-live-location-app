import {MAPBOX_TOKEN} from '@env';
import Mapbox from '@rnmapbox/maps';
import {useEffect} from 'react';
import {PermissionsAndroid, Platform, StyleSheet, View} from 'react-native';

Mapbox.setAccessToken(MAPBOX_TOKEN);

export const MapView = () => {
  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
        } else {
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkLocationPermission();
  }, []);

  return (
    <View className="flex-1">
      <Mapbox.MapView style={styles.map} key={Math.random().toString()}>
        <Mapbox.Camera followZoomLevel={8} followUserLocation />
        <Mapbox.UserLocation showsUserHeadingIndicator visible animated />
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
