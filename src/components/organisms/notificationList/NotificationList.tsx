import {NotificationItem} from '@components/molecules';
import {Notification} from '@typed/notif';
import {FlatList} from 'react-native';

type Props = {
  data: Notification[];
};

export const NotificationList = (props: Props) => {
  const {data} = props;
  console.log(data[0]);

  const renderItem = () => {
    return <NotificationItem />;
  };

  return (
    <>
      <FlatList data={data} renderItem={renderItem} />
    </>
  );
};
