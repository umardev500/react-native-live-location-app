import {NotificationItem} from '@components/molecules';
import {Notification} from '@typed/notif';
import {FlatList, ListRenderItem, RefreshControl} from 'react-native';

type Props = {
  data: Notification[];
  onReachEnd?: () => void;
  refreshing: boolean;
  onRefresh?: () => void;
};

export const NotificationList = (props: Props) => {
  const {data, onReachEnd, refreshing, onRefresh} = props;

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};
