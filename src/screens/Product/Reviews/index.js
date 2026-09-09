import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { AppIcon } from '../../../img/AppIcon';
import SingleReview from './SingleReview';

function Reviews({ onLayout, productId, reviews }) {
    const navigation = useNavigation();

    const navigatToReview = () => {
        navigation.push('Review', { id: productId, count: reviews.count, average: reviews.average });
    };

    return (
        <View style={styles.reviewContouter} onLayout={onLayout}>
            <Text style={styles.reviewtitle}>Reviews</Text>
            <View style={styles.divider} />
            {reviews.count > 0 ?
            <>
            <View style={styles.reviewcontainer}>
                <Text>{`(${reviews.average})`}</Text>
                <View style={styles.starcontainer}>
                    {[1, 2, 3, 4, 5].map((num) => num <= reviews.average ? <AppIcon.StarFilled key={num} width={20} height={20} /> : <AppIcon.Star key={num} width={20} height={20} />)}
                </View>
                <Text style={styles.reviewtext}>{`(${reviews.count} customer reviews)`}</Text>
            </View>
            <View style={styles.reviewouter}>
                {reviews.previews.map((rev) => <SingleReview key={rev.id} data={rev} />)}
            </View>
            <Pressable onPress={navigatToReview}>
                <Text style={styles.seeallreviewstext}>See all Reviews</Text>
            </Pressable>
            </> :
            <Text style={styles.noreviewtext}>No reviews yet.</Text>
            }
        </View>
    );
}

export default memo(Reviews);
