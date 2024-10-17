import {BellIconOn, MoreVert} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {HeaderAction} from './HeaderAction';

export const HomeHeaderAction = () => {
  const navigation = useNavigation();

  const navigateToNotification = useCallback(() => {
    navigation.navigate('Notification');
  }, []);

  return (
    <HeaderAction>
      <TouchableWithoutFeedback onPress={navigateToNotification}>
        <BellIconOn />
      </TouchableWithoutFeedback>
      <MoreVert />
    </HeaderAction>
  );
};
