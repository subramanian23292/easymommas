import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import AppHoc from '../../components/AppHoc';
import BottomTab from '../../components/BottomTab';
import Login from './Login';
import Profile from './Profile';
import { styles } from './style';

function Account() {
    const cusId = useSelector(state => state.auth.cusId);

    return (
        <>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollcontainer} bounces={false}>
            {cusId === null ? <Login /> : <Profile />}
        </ScrollView>
        <BottomTab page="Myaccount" />
        </>
    );
}

export default AppHoc(Account);
