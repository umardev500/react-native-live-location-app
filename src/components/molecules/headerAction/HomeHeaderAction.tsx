import {BellIcon, BellIconOn, MoreVert} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {notifStore} from '@store/notifStore';
import {useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {HeaderAction} from './HeaderAction';

export const HomeHeaderAction = () => {
  const navigation = useNavigation();
  const hasNotif = notifStore(state => state.hasNotif);
  console.log('has notif: ', hasNotif);

  const navigateToNotification = useCallback(() => {
    navigation.navigate('Notification');
  }, []);

  return (
    <HeaderAction>
      <TouchableWithoutFeedback onPress={navigateToNotification}>
        {hasNotif ? <BellIconOn /> : <BellIcon />}
      </TouchableWithoutFeedback>
      <MoreVert />
    </HeaderAction>
  );
};
