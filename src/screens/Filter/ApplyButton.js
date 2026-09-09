import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

function ApplyButton({ applyfilters }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.applycontainer, {bottom: insets.bottom}]}>
            <Pressable style={styles.applybtn} onPress={applyfilters}>
                <Text style={styles.applybtnlabel}>Apply</Text>
            </Pressable>
        </View>
    );
}

export default memo(ApplyButton);
