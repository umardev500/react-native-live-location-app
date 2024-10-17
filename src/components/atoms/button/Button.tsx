import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
};

export const Button: React.FC<Props> = props => {
  const {title, onPress, loading} = props;

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View className="bg-indigo-500 flex-row justify-center h-[50px] items-center rounded-lg">
          <View className="flex-row items-center">
            {loading && (
              <ActivityIndicator className="absolute -left-7" color={'white'} />
            )}
            <Text className="font-roboto text-white text-base font-semibold">
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
