import {PropsWithChildren} from 'react';
import {View} from 'react-native';

export type HeaderAction = PropsWithChildren<{}>;

export const HeaderAction = (props: HeaderAction) => {
  return <View className="flex-row items-center gap-4">{props.children}</View>;
};
