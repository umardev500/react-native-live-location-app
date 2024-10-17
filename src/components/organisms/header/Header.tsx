import {ArrowBack} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  title?: string;
  actions?: React.ReactNode;
};

export const Header = (props: Props) => {
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
          <Text className="text-lg font-medium text-gray-800">
            {props.title}
          </Text>
        </View>

        {/* Right */}
        {props.actions}
      </View>
    </View>
  );
};
