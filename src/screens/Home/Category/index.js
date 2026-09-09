import { memo } from 'react';
import { FlatList, Text, Pressable, useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import { styles } from './style';
import PlaceholderImage from '../../../components/ProductCard/PlaceholderImage';

function Category({ data }) {
    const navigation = useNavigation();
    const { width } = useWindowDimensions();
    const btnwidth = (width / 5);
    const imgwidth = btnwidth - 6;

    function handlenavigate(catname, catid) {
        navigation.push('ProductList', { title: catname, id: catid });
    }

    const renderItem = ({ item }) => (
        <Pressable key={item.id} style={[styles.catbtn, { width: btnwidth }]} onPress={() => handlenavigate(item.cat_name, item.id)}>
            <View style={styles.imgcontainer}>
                <FastImage source={{ uri: item.cat_img }} resizeMode="cover" style={[styles.catimg, { width: imgwidth, height: imgwidth }]} />
                <PlaceholderImage width={width / 14} height={width / 14} />
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.catlabel}>{item.cat_name}</Text>
        </Pressable>
    );

    return (
        <FlatList
            horizontal
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.scrollcontainer}
        />
    );
}

export default memo(Category);
