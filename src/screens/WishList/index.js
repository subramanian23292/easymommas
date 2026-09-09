import { useCallback } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import BottomTab from '../../components/BottomTab';
import ProductCard from '../../components/ProductCard';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';

const dataprod = [
    {id: 1, name: 'Wireless Audio System Multiroom 360', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/1.jpg')},
    {id: 2, name: 'Tablet Red EliteBook Revolve 810 G2', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/2.jpg')},
    {id: 3, name: 'White Solo 2 Wireless', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/3.jpg')},
    {id: 4, name: 'Smartphone 6S 32GB LTE', sp: '$1215', mrp: '$2215', imgpath: require('../../img/product/4.jpg')},
    {id: 5, name: 'Wireless Audio System Multiroom 360', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/5.jpg')},
    {id: 6, name: 'Tablet Red EliteBook Revolve 810 G2', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/6.jpg')},
    {id: 7, name: 'White Solo 2 Wireless', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/1.jpg')},
    {id: 8, name: 'Smartphone 6S 32GB LTE', sp: '$1215', mrp: '$2215', imgpath: require('../../img/product/2.jpg')},
    {id: 9, name: 'Wireless Audio System Multiroom 360', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/3.jpg')},
    {id: 10, name: 'Tablet Red EliteBook Revolve 810 G2', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/4.jpg')},
    {id: 11, name: 'White Solo 2 Wireless', sp: '$1999', mrp: '$2299', imgpath: require('../../img/product/5.jpg')},
    {id: 12, name: 'Smartphone 6S 32GB LTE', sp: '$1215', mrp: '$2215', imgpath: require('../../img/product/6.jpg')},
];

function WishList() {

    const renderproduct = useCallback(({item, index}) => {
        return (
            // eslint-disable-next-line react-native/no-inline-styles
            <View key={item.id} style={{ marginLeft: index % 2 === 0 ? 0 : 5}}>
                <ProductCard data={item} />
            </View>
        );
    }, []);

    function rowseparator() {
        return <View style={styles.itemseparator} />;
    }

    return (
        <>
        <View style={styles.wishlistcontainer}>
            <FlashList
                contentContainerStyle={styles.listcontainer}
                data={dataprod}
                renderItem={renderproduct}
                keyExtractor={(_, index) => index.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                bounces={false}
                ItemSeparatorComponent={rowseparator}
            />
        </View>
        <BottomTab page="Wishlist" />
        </>
    );
}

export default AppHoc(WishList);
