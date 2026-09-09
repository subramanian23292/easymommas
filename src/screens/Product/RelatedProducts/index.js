import { memo } from 'react';
import { View, Text, FlatList } from 'react-native';
import ProductCard from '../../../components/ProductCard';
import { styles } from './style';

function RelatedProducts({ data }) {
    const renderItem = ({ item }) => <ProductCard data={item} />;

    return (
        <View style={styles.relatedcontainer}>
            <Text style={styles.relatedtitle}>Related Products</Text>
            <View style={styles.divider} />
            <FlatList
                data={data}
                keyExtractor={(item) => item.prod_id.toString()}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.prodcontainer}
            />
        </View>
    );
}

export default memo(RelatedProducts);
