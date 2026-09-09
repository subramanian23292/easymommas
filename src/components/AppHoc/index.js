import { memo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';
import useNetinfo from '../hooks/netinfo';
import NoInternet from '../NoInternet';
import Loader from '../Loader';

const AppHoc = (Component) => {
    const WrappedComponent = (props) => {
        const insets = useSafeAreaInsets();
        const netinfo = useNetinfo();

        return (
            <View style={[styles.appcontainer, { paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]}>
                {netinfo === null ? (
                    <Loader />
                ) : netinfo ? (
                    <Component {...props} />
                ) : (
                    <NoInternet />
                )}
            </View>
        );
    };

    return memo(WrappedComponent);
};

export default AppHoc;
