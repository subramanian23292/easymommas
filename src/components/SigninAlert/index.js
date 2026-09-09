import { Modal, useWindowDimensions, Text, View, Pressable, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './style';
import { signinAlertFn } from '../../store/component/componentSlice';
import { AppIcon } from '../../img/AppIcon';

function SigninAlert() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const modalvisible = useSelector((state) => state.component.signinAlert);
    const modalheight = (270 + insets.bottom);

    function hidemodal() {
        dispatch(signinAlertFn(false));
    }

    const handlenavigation = (page) => {
        hidemodal();
        navigation.navigate(page);
    };

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalvisible}
                onRequestClose={hidemodal}
            >
                <TouchableWithoutFeedback onPress={hidemodal}>
                    <View style={styles.modalbackdrop} />
                </TouchableWithoutFeedback>
                <View pointerEvents="box-none" style={[styles.modalouter, { paddingTop: insets.top }]}>
                    <View style={[styles.modalcontent, { height: modalheight, width }]}>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.heading}>Sign in Required</Text>
                            <Pressable onPress={hidemodal} style={styles.closebtn}>
                                <AppIcon.CloseDark width={12} height={12} />
                            </Pressable>
                        </View>
                        <Text style={styles.message}>You need to sign in or create an account to add products to your cart.</Text>
                        <Pressable style={styles.loginbtn} onPress={() => handlenavigation('Login')}>
                            <Text style={styles.btnlabel}>Sign In</Text>
                        </Pressable>
                        <Pressable style={styles.registerbtn} onPress={() => handlenavigation('Register')}>
                            <Text style={styles.regbtnlabel}>Sign Up</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default SigninAlert;
