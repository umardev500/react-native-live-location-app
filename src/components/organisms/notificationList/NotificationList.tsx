import {NotificationItem} from '@components/molecules';
import {Notification} from '@typed/notif';
import {FlatList, ListRenderItem} from 'react-native';

type Props = {
  data: Notification[];
  onReachEnd?: () => void;
};

export const NotificationList = (props: Props) => {
  const {data, onReachEnd} = props;

  const renderItem: ListRenderItem<Notification> = ({item}) => {
    return <NotificationItem {...item} />;
  };

  return (
    <>
      <FlatList
        onEndReached={onReachEnd}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
};
