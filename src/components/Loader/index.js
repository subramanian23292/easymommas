import { useMemo } from 'react';
import { ActivityIndicator, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';
import Theme from '../Theme';

function Loader({ bgcolor = 'transparent' }) {
    const { width, height } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const loaderHeight = useMemo(() => height - (56 + insets.top + insets.bottom), [height, insets.top, insets.bottom]);

    return (
        <View style={[styles.loderview, {width, height: loaderHeight, backgroundColor: bgcolor }]}>
            <ActivityIndicator size="large" color={Theme.colors.secondary} />
        </View>
    );
}

export default Loader;
