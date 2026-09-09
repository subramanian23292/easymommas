import { useCallback, useState } from 'react';
import { View, Pressable, Text, TextInput, ScrollView, Keyboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AppIcon } from '../../img/AppIcon';
import AppHoc from '../../components/AppHoc';
import FormHoc from '../../components/FormHoc';
import { styles } from '../Address/style';
import Loader from '../../components/Loader';
import { cusid } from '../../store/auth/authSlice';
import { cancelChangepass, initChangepass } from '../../store/changepass/changepassSlice';

const validateschema = Yup.object().shape({
    newpassword: Yup.string().required('Enter Password'),
    confirmpassword: Yup.string().oneOf([Yup.ref('newpassword'), null], "Password don't match").required('Confirm Password'),
});

function ChangePassword() {
    const dispatch = useDispatch();
    const cusId = useSelector(cusid);
    const [secureText, setSecuretext] = useState(true);
    const [passIcon, setPassicon] = useState(<AppIcon.EyeOff width={20} height={20} />);
    const isLoading = useSelector((state) => state.changepass.changepassLoading);

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(cancelChangepass());
            };
        }, [dispatch])
    );

    function togglePassword() {
        let iconName = (secureText) ? <AppIcon.EyeOn width={20} height={20} /> : <AppIcon.EyeOff width={20} height={20} />;
        setSecuretext(!secureText);
        setPassicon(iconName);
    }

    function updatepassword(values) {
        Keyboard.dismiss();
        dispatch(initChangepass({ cus_id: cusId, new_password: values.newpassword }));
    }

    return (
        <>
        <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollcontainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
        >
            <View style={styles.formcontainer}>
                <Formik
                    validationSchema={validateschema}
                    initialValues={{ newpassword: '', confirmpassword: '' }}
                    onSubmit={values => updatepassword(values)}
                >
                    {({ handleChange, handleBlur, touched, errors, handleSubmit, values }) => (
                    <>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>New password</Text>
                        <View style={styles.passcontainer}>
                            <TextInput
                                style={[styles.inputfield, styles.passwordfield, touched.newpassword && errors.newpassword ? styles.invalid : styles.valid]}
                                onChangeText={handleChange('newpassword')}
                                onBlur={handleBlur('newpassword')}
                                value={values.newpassword}
                                secureTextEntry={secureText}
                            />
                            <Pressable style={styles.passwordiconbtn} onPress={togglePassword}>{passIcon}</Pressable>
                        </View>
                        {touched.newpassword && errors.newpassword && <Text style={styles.errortext}>{errors.newpassword}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Confirm password</Text>
                        <View style={styles.passcontainer}>
                            <TextInput
                                style={[styles.inputfield, styles.passwordfield, touched.confirmpassword && errors.confirmpassword ? styles.invalid : styles.valid]}
                                onChangeText={handleChange('confirmpassword')}
                                onBlur={handleBlur('confirmpassword')}
                                value={values.confirmpassword}
                                secureTextEntry={secureText}
                            />
                            <Pressable style={styles.passwordiconbtn} onPress={togglePassword}>{passIcon}</Pressable>
                        </View>
                        {touched.confirmpassword && errors.confirmpassword && <Text style={styles.errortext}>{errors.confirmpassword}</Text>}
                    </View>
                    <Pressable style={styles.savebutton} onPress={handleSubmit} underlayColor="transparent">
                        <Text style={styles.savebuttonlabel}>Save</Text>
                    </Pressable>
                    </>
                    )}
                </Formik>
            </View>
        </ScrollView>
        {isLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />}
        </>
    );
}

export default AppHoc(FormHoc(ChangePassword));
