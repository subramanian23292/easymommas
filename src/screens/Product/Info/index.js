import { memo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';

function Info({ reviews = {}, variation = {}, prodname = '', sizeguide = {}, guidemodalRef = null, scrollToReview }) {
    const hasMRP = variation.mrp !== 0;
    const hasguide = Object.keys(sizeguide).length > 0;

    function openguidemodal() {
        if (guidemodalRef.current) {
            guidemodalRef.current.openmodal();
        }
    }

    return (
        <View style={styles.infocontainer}>
            <Text style={styles.prodlabel}>{prodname}</Text>
            <Pressable style={styles.reviewcontainer} onPress={scrollToReview}>
                <View style={styles.starcontainer}>
                    {[1, 2, 3, 4, 5].map((num) => num <= reviews.average ? <AppIcon.StarFilled key={num} width={20} height={20} /> : <AppIcon.Star key={num} width={20} height={20} />)}
                </View>
                <Text style={styles.reviewtext}>{`(${reviews.count} customer reviews)`}</Text>
            </Pressable>
            <View style={styles.pricecontainer}>
                <Text style={styles.sp}>{'₹'}{variation.sp}</Text>
                {hasMRP && <Text style={styles.mrp}>{'₹'}{variation.mrp}</Text>}
            </View>
            {hasguide && <View style={styles.sizeguidebtnouter}>
                <Pressable style={styles.sizeguidebtn} onPress={openguidemodal}>
                    <Text style={styles.sizeguidebtntxt}>{sizeguide?.size_label}</Text>
                </Pressable>
            </View>}
        </View>
    );
}

export default memo(Info);
