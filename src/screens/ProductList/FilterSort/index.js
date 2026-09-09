import { useRef, memo } from 'react';
import { Pressable, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SortModal from './SortModal';
import { styles } from './style';

function FilterSort({ catId }) {
    const insets = useSafeAreaInsets();
    const sortmodalRef =  useRef();
    const navigation = useNavigation();

    function opensortmodal() {
        if (sortmodalRef.current) {
            sortmodalRef.current.openmodal();
        }
    }

    function openfilter() {
        navigation.push('Filter', { id: catId });
    }

    return (
        <>
        <View style={[styles.sortcontainer, {bottom: insets.bottom}]}>
            <Pressable style={[styles.btnconatiner, styles.divider]} onPress={openfilter}>
                <Text style={styles.btnlabel}>Filter</Text>
            </Pressable>
            <Pressable style={styles.btnconatiner} onPress={opensortmodal}>
                <Text style={styles.btnlabel}>Sort</Text>
            </Pressable>
        </View>
        <SortModal ref={sortmodalRef} catId={catId} />
        </>
    );
}

export default memo(FilterSort);
