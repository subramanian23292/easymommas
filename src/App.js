import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import RootNavigator from './navigators/RootNavigator';
import { loginSuccess } from './store/auth/authSlice';
import { navigationRef } from './components/RootNavigation';
import SigninAlert from './components/SigninAlert';
import { NotificationsProvider } from './components/Toast/ToastProvider';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        let cusId = await AsyncStorage.getItem('@cusId');
        if (cusId) {
          dispatch(loginSuccess(JSON.parse(cusId)));
        }
      } catch (e) {
      }
    };

    checkSession();
  }, [dispatch]);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
          <NotificationsProvider />
          <SigninAlert />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
