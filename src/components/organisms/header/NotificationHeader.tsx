import {NotificationHeaderAction} from '@components/molecules';
import {Header} from './Header';

export const NotificationHeader = () => {
  return (
    <Header title="Notifications" actions={<NotificationHeaderAction />} />
  );
};
