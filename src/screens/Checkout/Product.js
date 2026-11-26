import { View, Text, useWindowDimensions } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { styles } from './style';

const Product = ({ data }) => {
    const { width } = useWindowDimensions();
    const prodtotal = data.sp * data.qty;
    const finalprodtotal = parseFloat(prodtotal.toFixed(2));
    const flexwidth = (width - 100);

    return (
        <View style={styles.prodcontainer}>
            <View style={styles.imgcontainer}>
                <FastImage source={{ uri: data.img }} resizeMode="contain" style={styles.fastimg} />
            </View>
            <View style={{ flexBasis: flexwidth }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.prodlabel}>{data.prod_name}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.prodoptions}>{data.combo_name}</Text>
                <View style={styles.priceinfo}>
                    <Text style={styles.prodtotal}>{`₹${finalprodtotal}`}</Text>
                    <Text style={styles.prodqty}>Qty: {data.qty}</Text>
                </View>
            </View>
        </View>
    );
};

export default Product;
