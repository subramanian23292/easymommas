import { memo } from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './style';

const TabButton = ({ label, icon, iconActive, isActive, onPress }) => {
    return (
        <Pressable style={styles.bottombtn} onPress={onPress}>
            {isActive ? iconActive : icon}
            <Text style={[styles.btntext, isActive ? styles.btnlabelactive : styles.btnlabel]}>
                {label}
            </Text>
        </Pressable>
    );
};

export default memo(TabButton);
