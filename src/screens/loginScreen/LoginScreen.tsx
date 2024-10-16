import {Button, TextInput} from '@components/atoms';
import {StatusBar, Text, View} from 'react-native';

export const LoginScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {/* Container */}
      <View className="flex-1 items-center bg-white justify-between py-14">
        {/* Inner */}
        <View className="gap-16 w-full">
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
          <View className="gap-5 px-4">
            <View className="gap-4">
              <TextInput placeholder="Username or email" />
              <TextInput placeholder="Password" password />
            </View>
            <Button title="Continue" />
          </View>
          {/* End Form */}
        </View>

        <View className="px-10 w-full">
          <Text className="text-base text-center text-gray-500">
            Ensure your login credentials are kept private and secure.
          </Text>
        </View>
        {/* End of Inner */}
      </View>
    </>
  );
};
