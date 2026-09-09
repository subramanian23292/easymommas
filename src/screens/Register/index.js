import { useState, useCallback } from 'react';
import { View, Text, TextInput, useWindowDimensions, Pressable, Keyboard } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AuthHoc from '../../components/AuthHoc';
import { styles } from '../Login/style';
import { AppIcon } from '../../img/AppIcon';
import { registerInit, registerCancel } from '../../store/register/registerSlice';
import Loader from '../../components/Loader';

const validateschema = Yup.object().shape({
    fname: Yup.string().required('Enter First Name'),
    lname: Yup.string().required('Enter Last Name'),
    email: Yup.string().required('Enter Email').email('Invalid email'),
    password: Yup.string().required('Enter Password'),
});

function Register() {
    const route = useRoute();
    const page = route.params?.page;
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const [secureText, setSecuretext] = useState(true);
    const [passIcon, setPassicon] = useState(<AppIcon.EyeOff width={20} height={20} />);
    const isLoading = useSelector((state) => state.register.isLoading);
    const error = useSelector((state) => state.register.error);

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(registerCancel());
            };
        }, [dispatch])
    );

    function togglePassword() {
        let iconName = (secureText) ? <AppIcon.EyeOn width={20} height={20} /> : <AppIcon.EyeOff width={20} height={20} />;
        setSecuretext(!secureText);
        setPassicon(iconName);
    }

    function handleregister(values) {
        Keyboard.dismiss();
        const payload = {
            regfname: values.fname,
            reglname: values.lname,
            regemail: values.email,
            regpass: values.password,
            page: page ?? '',
        };
        dispatch(registerInit(payload));
    }

    return (
        <>
        <View style={{width: width - 80}}>
            <View style={styles.titlecontainer}>
                <Text style={styles.pagetitle}>Register</Text>
                <View style={styles.divider} />
            </View>
            {error !== '' && <Text style={styles.errortxt}>{error}</Text>}
            <Formik
                validationSchema={validateschema}
                initialValues={{ fname: '', lname: '', email: '', password: '' }}
                onSubmit={values => handleregister(values)}
            >
                {({ handleChange, handleBlur, touched, errors, handleSubmit, values }) => (
                <>
                <View style={styles.fieldcontainer}>
                    <Text style={styles.fieldlabel}>First name</Text>
                    <TextInput
                        style={[styles.inputfield, touched.fname && errors.fname ? styles.invalid : styles.valid]}
                        onChangeText={handleChange('fname')}
                        onBlur={handleBlur('fname')}
                        value={values.fname}
                    />
                    {touched.fname && errors.fname && <Text style={styles.errortext}>{errors.fname}</Text>}
                </View>
                <View style={styles.fieldcontainer}>
                    <Text style={styles.fieldlabel}>Last name</Text>
                    <TextInput
                        style={[styles.inputfield, touched.lname && errors.lname ? styles.invalid : styles.valid]}
                        onChangeText={handleChange('lname')}
                        onBlur={handleBlur('lname')}
                        value={values.lname}
                    />
                    {touched.lname && errors.lname && <Text style={styles.errortext}>{errors.lname}</Text>}
                </View>
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
                    <Text style={styles.btnlabel}>Register</Text>
                </Pressable>
                </>
                )}
            </Formik>
        </View>
        {isLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />}
        </>
    );
}

export default AuthHoc(Register);
