import {NotificationList} from '@components/organisms';
import {NotificationHeader} from '@components/organisms/header/NotificationHeader';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const NotificationScreen = () => {
  const insets = useSafeAreaInsets();
  const containerStyle = {
    paddingBottom: insets.bottom,
  };

  return (
    <>
      <NotificationHeader />
      <View className="flex-1 bg-white" style={containerStyle}>
        <NotificationList />
      </View>
    </>
  );
};
