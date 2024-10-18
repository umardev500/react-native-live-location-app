import {MoreHorz} from '@components/atoms';
import {Notification} from '@typed/notif';
import React from 'react';
import {Text, View} from 'react-native';

type Props = Notification & {};

export const NotificationItem = (props: Props) => {
  const {title, message, created_at} = props;

  return (
    <>
      <View className="px-4 border-b py-4 border-b-gray-100 bg-white">
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-gray-800 font-roboto font-medium">
            {title || 'Low Battery Warning! 🔋'}
          </Text>

          <MoreHorz size={18} color={'#9CA3AF'} />
        </View>
        <Text className="text-sm text-gray-600 mt-3">{message}</Text>
        <Text className="text-sm text-gray-400 mt-1">{created_at}</Text>
      </View>
    </>
  );
};
