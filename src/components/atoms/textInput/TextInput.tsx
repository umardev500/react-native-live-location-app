import {EyeSlashIcon} from '@components/atoms/icons';
import {EyeIcon} from '@components/atoms/icons/EyeIcon';
import {useState} from 'react';
import {
  TextInput as RnTextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type TextInputProps = {
  placeholder?: string;
  password?: boolean;
};

export const TextInput = (props: TextInputProps) => {
  const {placeholder} = props;
  const [showPass, setShowPass] = useState(false);

  const handleShowHidePass = () => {
    setShowPass(!showPass);
  };

  return (
    <View className="bg-gray-100 text-red-100 rounded-lg flex-row items-center">
      <RnTextInput
        secureTextEntry={!showPass && props.password}
        className="px-4 flex-1 h-[50px] text-base font-roboto text-gray-800"
        placeholderTextColor={'#6b7280'}
        placeholder={placeholder}
      />
      {props.password && (
        <TouchableWithoutFeedback onPress={handleShowHidePass}>
          <View className="px-4">
            {showPass ? <EyeIcon /> : <EyeSlashIcon />}
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};
