import { memo } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';

function BackButton() {
    const navigation = useNavigation();

    function handleback() {
        navigation.goBack();
    }

    return (
        <Pressable style={styles.backbtn} onPress={handleback}>
            <AppIcon.Back width={24} height={24} />
        </Pressable>
    );
}

export default memo(BackButton);
