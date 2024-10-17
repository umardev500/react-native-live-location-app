import {MoreHorz} from '@components/atoms';
import React from 'react';
import {Text, View} from 'react-native';

export const NotificationItem = () => {
  return (
    <>
      <View className="px-4 border-b py-4 border-b-gray-100 bg-white">
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-gray-800 font-roboto font-medium">
            Low Battery Warning! 🔋
          </Text>

          <MoreHorz size={18} color={'#9CA3AF'} />
        </View>
        <Text className="text-sm text-gray-600 mt-3">
          Your device's battery is low. Enable battery saver mode to keep
          location tracking active.
        </Text>
        <Text className="text-sm text-gray-400 mt-1">Yesterday 10:24</Text>
      </View>
    </>
  );
};
