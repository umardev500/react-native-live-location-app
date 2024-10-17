import {Button, TextInput} from '@components/atoms';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      {/* Container */}
      <SafeAreaView className="flex-1 bg-white py-4">
        <View className="flex-1 items-center justify-between">
          {/* Inner */}
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={0}
            className="w-full"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View className="gap-16 w-full flex-1 pb-10">
              <View className="justify-center flex-row pt-16">
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
          </KeyboardAvoidingView>

          <View className="px-10 w-full">
            <Text className="text-base text-center text-gray-500">
              Ensure your login credentials are kept private and secure.
            </Text>
          </View>
          {/* End of Inner */}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});
