import {TextInput} from '@components/atoms';
import {StatusBar, Text, View} from 'react-native';

export const LoginScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {/* Container */}
      <View className="flex-1 bg-white justify-center">
        {/* Inner */}
        <View className="justify-center flex-row py-4">
          <View className="items-center gap-1">
            <Text className="text-2xl text-gray-800 font-poppins font-semibold">
              Hello Again! 👋
            </Text>
            <Text className="font-roboto text-base text-gray-600">
              Your journey continues. Let’s log in!
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="gap-4 px-4">
          <TextInput placeholder="Username or email" />
          <TextInput placeholder="Password" password />
        </View>
        {/* End Form */}
        {/* End of Inner */}
      </View>
    </>
  );
};
