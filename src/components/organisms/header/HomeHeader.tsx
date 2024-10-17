import {HomeHeaderAction} from '@components/molecules';
import {Header} from './Header';

export const HomeHeader = () => {
  return <Header title="Home" actions={<HomeHeaderAction />} />;
};
