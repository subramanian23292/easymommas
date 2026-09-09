import { memo } from 'react';
import { Text, Pressable, View } from 'react-native';
import BackButton from './BackButton';
import { styles } from './style';

function Header({ clearfilters }) {
    return (
        <View style={styles.headercontainer}>
            <BackButton />
            <Text style={styles.headertitle}>Filters</Text>
            <Pressable style={styles.clearbtn} onPress={clearfilters}>
                <Text style={styles.clearbtnlabel}>Clear filter</Text>
            </Pressable>
        </View>
    );
}

export default memo(Header);
