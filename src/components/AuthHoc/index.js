import { memo } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../../screens/Login/BackButton';
import { styles } from './style';
import useNetinfo from '../hooks/netinfo';
import NoInternet from '../NoInternet';
import Loader from '../Loader';

const AuthHoc = (Component) => {
    const WrappedComponent = (props) => {
        const insets = useSafeAreaInsets();
        const netinfo = useNetinfo();

        return (
            <View style={[styles.appcontainer, {paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}]}>
                <View style={styles.backcontainer}>
                    <BackButton />
                </View>
                {netinfo === null ? (
                    <Loader />
                ) : netinfo ? (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        style={styles.keyboardcontainer}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 62 : 0}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="always"
                            contentContainerStyle={styles.scrollcontainer}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                        >
                            <Component {...props} />
                        </ScrollView>
                    </KeyboardAvoidingView>
                ) : (
                    <NoInternet />
                )}
            </View>
        );
    };

    return memo(WrappedComponent);
};

export default AuthHoc;
