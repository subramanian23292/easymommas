import { View, Text, Pressable } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { AppIcon } from '../../../img/AppIcon';

function Product({ data, ordstatus, orderId }) {
    const navigation = useNavigation();

    function handlenavigation() {
        navigation.push('Product', {id: data.pid, title: data.pname});
    }

    const reviewnavigation = () => {
        navigation.push('WriteReview', { pid: data.pid, orderid: orderId });
    };

    return (
        <View style={styles.productcontainer}>
            <View style={styles.imgcontainer}>
                <FastImage source={{ uri: data.pimg }} resizeMode="cover" style={styles.prodimg}/>
            </View>
            <View style={styles.infocontainer}>
                <Pressable onPress={handlenavigation}>
                    <Text numberOfLines={1} style={styles.prodname}>{data.pname}</Text>
                    <Text numberOfLines={1} style={styles.opname}>{data.opname}</Text>
                </Pressable>
                <View style={styles.qtyprice}>
                    <Text style={styles.qtypricelabel}>Qty{':'} {data.qty}</Text>
                    <Text style={styles.qtypricelabel}>{`€${data.total}`}</Text>
                </View>
                {ordstatus === 5 &&
                <View style={styles.revcontainer}>
                    {data.submitted === 0 &&
                    <Pressable onPress={reviewnavigation}>
                        <Text style={styles.writetext}>Write review</Text>
                    </Pressable>}
                    {data.submitted === 1 &&
                        <View style={styles.starcontainer}>
                            {[1, 2, 3, 4, 5].map((num) => num <= data.rating ? <AppIcon.StarFilled key={num} width={20} height={20} /> : <AppIcon.Star key={num} width={20} height={20} />)}
                        </View>
                    }
                </View>}
            </View>
        </View>
    );
}

function Items({ prod = [], ordstatus, orderId }) {
    return (
        <View style={styles.itemcontainer}>
            <Text style={styles.sectiontitle}>Purchased Items</Text>
            {prod.map(item => <Product key={item.pid} data={item} ordstatus={ordstatus} orderId={orderId} />)}
        </View>
    );
}

export default Items;
