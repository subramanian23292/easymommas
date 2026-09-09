import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';

function Footer() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    function addaddress() {
        navigation.navigate('Address');
    }

    return (
        <View style={[styles.footercontainer, {bottom: insets.bottom}]}>
            <Pressable style={styles.addbutton} onPress={addaddress}>
                <Text style={styles.addbuttonlabel}>Add Address</Text>
            </Pressable>
        </View>
    );
}

export default memo(Footer);
