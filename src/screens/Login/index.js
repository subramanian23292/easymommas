import { useState, useCallback } from 'react';
import { View, Text, TextInput, useWindowDimensions, Pressable, Keyboard } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthHoc from '../../components/AuthHoc';
import { styles } from './style';
import { AppIcon } from '../../img/AppIcon';
import { loginCheck, loginCancel } from '../../store/auth/authSlice';
import Loader from '../../components/Loader';

const validateschema = Yup.object().shape({
    email: Yup.string().required('Enter Email').email('Invalid email'),
    password: Yup.string().required('Enter Password'),
});

function Login() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [secureText, setSecuretext] = useState(true);
    const [passIcon, setPassicon] = useState(<AppIcon.EyeOff width={20} height={20} />);
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(loginCancel());
            };
        }, [dispatch])
    );

    function togglePassword() {
        let iconName = (secureText) ? <AppIcon.EyeOn width={20} height={20} /> : <AppIcon.EyeOff width={20} height={20} />;
        setSecuretext(!secureText);
        setPassicon(iconName);
    }

    function handlelogin(values) {
        Keyboard.dismiss();
        const payload = {
            email: values.email,
            password: values.password,
        };
        dispatch(loginCheck(payload));
    }

    const navigateRegister = () => {
        navigation.navigate('Register', { page: 'Login' });
    };

    return (
        <>
        <View style={{width: width - 80}}>
            <View style={styles.titlecontainer}>
                <Text style={styles.pagetitle}>Login</Text>
                <View style={styles.divider} />
            </View>
            {error !== '' && <Text style={styles.errortxt}>{error}</Text>}
            <Formik
                validationSchema={validateschema}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => handlelogin(values)}
            >
                {({ handleChange, handleBlur, touched, errors, handleSubmit, values }) => (
                <>
                <View style={styles.fieldcontainer}>
                    <Text style={styles.fieldlabel}>Email address</Text>
                    <TextInput
                        keyboardType="email-address"
                        style={[styles.inputfield, touched.email && errors.email ? styles.invalid : styles.valid]}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email && <Text style={styles.errortext}>{errors.email}</Text>}
                </View>
                <View style={styles.fieldcontainer}>
                    <Text style={styles.fieldlabel}>Password</Text>
                    <View style={styles.passcontainer}>
                        <TextInput
                            style={[styles.inputfield, styles.passwordfield, touched.password && errors.password ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={secureText}
                        />
                        <Pressable style={styles.passwordiconbtn} onPress={togglePassword}>{passIcon}</Pressable>
                    </View>
                    {touched.password && errors.password && <Text style={styles.errortext}>{errors.password}</Text>}
                </View>
                <Pressable style={styles.loginbtn} onPress={handleSubmit}>
                    <Text style={styles.btnlabel}>Login</Text>
                </Pressable>
                </>
                )}
            </Formik>
            <View style={styles.footer}>
                <Pressable>
                    <Text style={styles.lostbtnlabel}>Lost your password?</Text>
                </Pressable>
                <View style={styles.orcontainer}>
                    <View style={styles.orlabelcontainer}>
                        <Text style={styles.orlabel}>Or</Text>
                    </View>
                    <View style={styles.ordivider} />
                </View>
                <View style={styles.registerouter}>
                    <Text style={styles.dontaccount}>Don{"'"}t have account{'?'}</Text>
                    <Pressable style={styles.signupbtn} onPress={navigateRegister}>
                        <Text style={styles.signuptext}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
        {isLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />}
        </>
    );
}

export default AuthHoc(Login);
