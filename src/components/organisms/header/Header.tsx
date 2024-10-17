import {Text, View} from 'react-native';

export const Header = () => {
  return (
    <>
      <View className="h-14 flex-row flex-1">
        {/* Left */}
        <View>
          <Text>Home</Text>
        </View>
      </View>
    </>
  );
};
