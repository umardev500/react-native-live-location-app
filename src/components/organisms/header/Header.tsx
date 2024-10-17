import {ArrowBack, BellIconOn, MoreVert} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const Header = () => {
  const insets = useSafeAreaInsets();
  const headerStyle = {
    paddingTop: insets.top,
  };
  const navigation = useNavigation();
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={headerStyle} className="bg-white">
      {/* inner */}
      <View className="flex-row items-center px-4 ">
        {/* Left */}
        <View className="flex-row h-14 items-center gap-4 flex-1">
          {navigation.canGoBack() && (
            <TouchableWithoutFeedback onPress={handleBack}>
              <ArrowBack color={'#1F2937'} />
            </TouchableWithoutFeedback>
          )}
          <Text className="text-lg font-medium text-gray-800">Home</Text>
        </View>

        {/* Right */}
        <View className="flex-row items-center gap-4">
          <BellIconOn />
          <MoreVert />
        </View>
      </View>
    </View>
  );
};
