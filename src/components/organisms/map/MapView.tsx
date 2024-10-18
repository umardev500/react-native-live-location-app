import {MAPBOX_TOKEN} from '@env';
import Mapbox from '@rnmapbox/maps';
import {StyleSheet, View} from 'react-native';

Mapbox.setAccessToken(MAPBOX_TOKEN);

type Props = {
  handleUpdate: (location: Mapbox.Location) => void;
};

export const MapView = (props: Props) => {
  const {handleUpdate} = props;

  return (
    <View className="flex-1">
      <Mapbox.MapView style={styles.map}>
        <Mapbox.Camera followZoomLevel={8} followUserLocation />
        <Mapbox.UserLocation
          onUpdate={handleUpdate}
          showsUserHeadingIndicator
          visible
          animated
        />
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
