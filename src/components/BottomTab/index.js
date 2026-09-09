import { memo, useCallback } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';
import TabButton from './TabButton';

function BottomTab({ page }) {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const goTo = useCallback((screen) => {
        navigation.navigate(screen);
    }, [navigation]);

    const goHome = useCallback(() => {
        if (page !== 'Home') {
            navigation.popToTop();
        }
    }, [navigation, page]);

    return (
        <View style={[styles.bottomcontainer, {bottom: insets.bottom}]}>
            <TabButton
                label="Home"
                icon={<AppIcon.Home width={20} height={20} />}
                iconActive={<AppIcon.HomeFilled width={20} height={20} />}
                isActive={page === 'Home'}
                onPress={goHome}
            />
            <TabButton
                label="Categories"
                icon={<AppIcon.Category width={20} height={20} />}
                iconActive={<AppIcon.CategoryFilled width={20} height={20} />}
                isActive={page === 'Category'}
                onPress={() => goTo('Category')}
            />
            <TabButton
                label="Account"
                icon={<AppIcon.User width={20} height={20} />}
                iconActive={<AppIcon.UserFilled width={20} height={20} />}
                isActive={page === 'Myaccount'}
                onPress={() => goTo('Account')}
            />
        </View>
    );
}

export default memo(BottomTab);
