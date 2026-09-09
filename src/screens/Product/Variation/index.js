import { memo } from 'react';
import { View, Text, Pressable, Image, useWindowDimensions } from 'react-native';
import { styles } from './style';
import PlaceholderImage from '../../../components/ProductCard/PlaceholderImage';

function Variation({ data, defaultobj, updateoption }) {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.optionouter}>
            {data?.map((item) => (
            <View key={item.op_id}>
                <Text style={styles.optiontitle}>{item.op_name} {':'} {defaultobj[item.op_name]}</Text>
                <View style={styles.optionvalouter}>
                    {item.op_values?.map((opval, index) => (
                        opval?.op_val_img
                        ?
                        <Pressable
                            key={opval.op_val_id}
                            style={[styles.opimgbutton, opval.selected ? styles.checked : styles.unchecked]}
                            onPress={() => updateoption(item.op_id, opval.op_val_id, item.op_name, opval.op_val_name, opval?.prod_gal)}
                        >
                            <Image source={{ uri: opval.op_val_img }} style={styles.opvalimg} resizeMode="cover" />
                            <PlaceholderImage width={width / 14} height={width / 14} />
                        </Pressable>
                        :
                        opval?.op_val_color
                        ?
                        <Pressable
                            key={opval.op_val_id}
                            style={[styles.opcolorbtn, opval.selected ? styles.checked : styles.unchecked]}
                            onPress={() => updateoption(item.op_id, opval.op_val_id, item.op_name, opval.op_val_name, opval?.prod_gal)}
                        >
                            <View style={[styles.opcolorview, { backgroundColor: opval?.op_val_color }]} />
                        </Pressable>
                        :
                        <Pressable
                            key={opval.op_val_id}
                            style={[styles.optionbutton, opval.selected ? styles.checked : styles.unchecked]}
                            onPress={() => updateoption(item.op_id, opval.op_val_id, item.op_name, opval.op_val_name, opval?.prod_gal)}
                        >
                            <Text style={styles.optionvaltext}>{opval.op_val_name}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            ))}
        </View>
    );
}

export default memo(Variation);
