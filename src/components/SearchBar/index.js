import { View, Pressable, Text, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';

function SearchBar() {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();

    const searchnavig = () => {
        navigation.navigate('Search');
    };

    return (
        <View style={[styles.searchcontainer, {width}]}>
            <Pressable style={styles.searchbar} onPress={searchnavig}>
                <AppIcon.Seacrh width={20} height={20} />
                <Text style={styles.searchtext}>Search</Text>
            </Pressable>
        </View>
    );
}

export default SearchBar;
