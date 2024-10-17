import notifee from '@notifee/react-native';
import {useCallback} from 'react';

export interface NotificationParams {
  title: string;
  body: string;
  sound?: string; // Optional: Custom sound file name, or 'default'
}

export const useLocalNotification = () => {
  const displayLocalNotification = useCallback(
    async ({title, body, sound = 'notifee'}: NotificationParams) => {
      try {
        // Create a notification channel (Android only)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          sound: sound, // Custom sound or default
        });

        // Display the notification
        await notifee.displayNotification({
          title,
          body,
          android: {
            channelId,
          },
          ios: {
            sound, // iOS notification sound
          },
        });
      } catch (error) {
        console.error('Failed to display local notification:', error);
      }
    },
    [],
  );

  return displayLocalNotification;
};
