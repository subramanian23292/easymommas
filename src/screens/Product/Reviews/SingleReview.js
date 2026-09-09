import { View, Text } from 'react-native';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';

const SingleReview = ({ data }) => {
    return (
        <View style={styles.singlereviewouter}>
            <View style={styles.userrating}>
                <View style={styles.userimg}><AppIcon.User width={10} height={10}/></View>
                <Text style={styles.username}>{data.cname} {'-'} {data.date_added}</Text>
            </View>
            <View style={styles.starcontainer}>
                {[1, 2, 3, 4, 5].map((num) => num <= data.rating ? <AppIcon.StarFilled key={num} width={14} height={14} /> : <AppIcon.Star key={num} width={14} height={14} />)}
            </View>
            <Text style={styles.usertextreview}>{data.review_text}</Text>
        </View>
    );
};

export default SingleReview;
