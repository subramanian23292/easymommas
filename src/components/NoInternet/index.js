import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from './style';
import NoInternetImg from '../../img/nointernet.svg';

function NoInternet() {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.conatiner}>
            <NoInternetImg width={width / 3} height={width / 3} />
            <Text style={styles.heading}>No internet connection</Text>
            <Text style={styles.para}>Please check your connection again.</Text>
        </View>
    );
}

export default NoInternet;
