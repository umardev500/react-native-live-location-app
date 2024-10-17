import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
};

export const Button: React.FC<Props> = props => {
  const {title, onPress} = props;

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View className="bg-indigo-500 flex-row justify-center h-[50px] items-center rounded-lg">
          <Text className="font-roboto text-white text-base font-semibold">
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
