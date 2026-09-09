import { memo } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';

function Search() {
    const navigation = useNavigation();

    const searchnavig = () => {
        navigation.navigate('Search');
    };

    return (
        <Pressable style={styles.searchbtn} onPress={searchnavig}>
            <AppIcon.SearchLight width={20} height={20} />
        </Pressable>
    );
}

export default memo(Search);
