import {NotificationItem} from '@components/molecules';
import {FlatList} from 'react-native';

export const NotificationList = () => {
  const data = Array.from({length: 30}, (_, i) => {
    // Example data: fill it with numbers, strings, or objects as needed
    return {
      id: i + 1,
      name: `Item ${i + 1}`,
      value: Math.random().toFixed(2), // Random value between 0 and 1
    };
  });

  const renderItem = () => {
    return <NotificationItem />;
  };

  return (
    <>
      <FlatList data={data} renderItem={renderItem} />
    </>
  );
};
