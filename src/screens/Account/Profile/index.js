import { useCallback } from 'react';
import { Pressable, View, Text } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './style';
import { logoutInit, loginCancel, cusid } from '../../../store/auth/authSlice';
import { profileFetch, profileCancel } from '../../../store/profile/profileSlice';
import Loader from '../../../components/Loader';

function Profile() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const cusId = useSelector(cusid);
    const firstname = useSelector((state) => state.profile.firstname);
    const lastname = useSelector((state) => state.profile.lastname);
    const profileLoading = useSelector((state) => state.profile.profileLoading);

    useFocusEffect(
        useCallback(() => {
            if (firstname === '') {
                dispatch(profileFetch({ cus_id: cusId }));
            }
            return () => {
                dispatch(loginCancel());
                dispatch(profileCancel());
            };
        }, [firstname, dispatch, cusId])
    );

    function handlelogout() {
        dispatch(logoutInit({ cus_id: cusId }));
    }

    function handlenavigate(page) {
        navigation.navigate(page);
    }

    return (
        <>
        <View style={styles.profilecontainer}>
            <View style={styles.namecontainer}>
                <View style={styles.imgcontainer}>
                    <AppIcon.User width={30} height={30} />
                </View>
                <Text style={styles.namelabel}>{`${firstname} ${lastname}`}</Text>
            </View>
            <View style={styles.btnscontainer}>
                <Pressable style={styles.infobtn} onPress={() => handlenavigate('Profile')}>
                    <Text style={styles.infobtnlabel}>Profile</Text>
                </Pressable>
                <Pressable style={styles.infobtn} onPress={() => handlenavigate('ChangePassword')}>
                    <Text style={styles.infobtnlabel}>Change Password</Text>
                </Pressable>
                <Pressable style={styles.infobtn} onPress={() => handlenavigate('AddressList')}>
                    <Text style={styles.infobtnlabel}>Addresses</Text>
                </Pressable>
                <Pressable style={styles.infobtn} onPress={() => handlenavigate('OrderList')}>
                    <Text style={styles.infobtnlabel}>Orders</Text>
                </Pressable>
                <Pressable style={styles.infobtn}>
                    <Text style={styles.infobtnlabel}>Return {'/'} Exchange</Text>
                </Pressable>
                <Pressable style={styles.infobtn}>
                    <Text style={styles.infobtnlabel}>FAQs</Text>
                </Pressable>
                <Pressable style={styles.infobtn}>
                    <Text style={styles.infobtnlabel}>Product Support</Text>
                </Pressable>
                <Pressable style={styles.logoutbtn} onPress={handlelogout}>
                    <Text style={styles.logoutlabel}>Logout</Text>
                </Pressable>
            </View>
        </View>
        {(isLoading || profileLoading) && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />}
        </>
    );
}

export default Profile;
