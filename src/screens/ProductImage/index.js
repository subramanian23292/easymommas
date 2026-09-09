import { useState } from 'react';
import { ScrollView, Pressable, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import FastImage from '@d11/react-native-fast-image';
import ImageViewer from './ImageViewer';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';
import Theme from '../../components/Theme';
import { AppIcon } from '../../img/AppIcon';
import PlaceholderImage from '../../components/ProductCard/PlaceholderImage';

function ProductImage() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();
    const images = route.params.images;
    const [image, setImage] = useState(images[0].imgpath);
    const { width } = useWindowDimensions();

    function closeimage() {
        navigation.goBack();
    }

    return (
        <>
        <Pressable onPress={closeimage} style={styles.closebutton}>
            <AppIcon.CloseLight width={14} height={14} />
        </Pressable>
        <View style={[styles.scrollouter, {bottom: insets.bottom + 40}]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
            >
                {images?.map((item) => (
                    // eslint-disable-next-line react-native/no-inline-styles
                    <Pressable onPress={() => setImage(item.imgpath)} key={item.id} style={[styles.imagebutton, {borderColor: item.imgpath === image ? Theme.colors.secondary : '#bcbcbc'}]}>
                        <FastImage source={{ uri: item.imgpath }} style={{height: width / 8, width: width / 8}} resizeMode="contain" />
                        <PlaceholderImage width={width / 14} height={width / 14} />
                    </Pressable>
                ))}
            </ScrollView>
        </View>
        <ImageViewer imageUrl={image} width={width} height={width} onRequestClose={() => {}} />
        </>
    );
}

export default AppHoc(ProductImage);
