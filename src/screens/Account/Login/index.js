import { View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';

function Login() {
    const navigation = useNavigation();

    function handlenavigation() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.logincontainer}>
            <View style={styles.imgcontainer}>
                <AppIcon.User width={30} height={30} />
            </View>
            <Pressable style={styles.loginbtn} onPress={handlenavigation}>
                <Text style={styles.regtext}>Login {'/'} Register</Text>
            </Pressable>
        </View>
    );
}

export default Login;
