import {Button, TextInput} from '@components/atoms';
import {API} from '@env';
import {StackActions, useNavigation} from '@react-navigation/native';
import {mmkvStorage} from '@storage/mmkv';
import {LoginResponse, User} from '@typed/login';
import {useCallback, useRef, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigation = useNavigation();
  const [, setToken] = useMMKVStorage<string>('token', mmkvStorage);
  const [, setUser] = useMMKVStorage<User>('user', mmkvStorage);
  const username = useRef('');
  const password = useRef('');

  const handleUsernameChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      username.current = e.nativeEvent.text;
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      password.current = e.nativeEvent.text;
    },
    [],
  );
  const dev = true;

  const handleSubmit = useCallback(async () => {
    if (dev) {
      navigation.dispatch(StackActions.replace('Home'));
    } else {
      setLoginLoading(true);
      const url = API + '/login';

      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username.current,
            password: password.current,
          }),
        });

        if (resp.status === 401) {
          Alert.alert('Invalid credentials');
          return;
        }

        const json: LoginResponse = await resp.json();
        setToken(() => json.token);
        setUser(() => json.user);
        navigation.dispatch(StackActions.replace('Home'));
      } catch (e) {
        console.log(e);
      } finally {
        setLoginLoading(false);
      }
    }
  }, []);

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
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
                  <Text className="font-roboto text-lg text-gray-600">
                    Your journey continues. Let’s log in!
                  </Text>
                </View>
              </View>

              {/* Form */}
              <View className="gap-5 px-4">
                <View className="gap-4">
                  <TextInput
                    onChange={handleUsernameChange}
                    placeholder="Username or email"
                  />
                  <TextInput
                    onChange={handlePasswordChange}
                    placeholder="Password"
                    password
                  />
                </View>
                <Button
                  loading={loginLoading}
                  onPress={handleSubmit}
                  title="Continue"
                />
              </View>
              {/* End Form */}
            </View>
          </KeyboardAvoidingView>

          <View className="px-10 w-full">
            <Text className="text-sm text-center text-gray-500">
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
