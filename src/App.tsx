import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LoginScreen} from './screens';
import './styles/global.css';

const App = () => {
  return (
    <SafeAreaProvider>
      <LoginScreen />
    </SafeAreaProvider>
  );
};

export default App;
