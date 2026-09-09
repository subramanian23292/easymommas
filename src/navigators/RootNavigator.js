import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppStack from './AppStack';
import Theme from '../components/Theme';

function RootNavigator() {
    const insets = useSafeAreaInsets();

    return (
        <>
        <View style={{height: insets.top, backgroundColor: Theme.colors.primary}}>
            <StatusBar backgroundColor={Theme.colors.primary} barStyle="light-content" />
        </View>
        <AppStack />
        </>
    );
}

export default RootNavigator;
