import { useCallback } from 'react';
import { View, Pressable, Text, TextInput, ScrollView, Keyboard } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import AppHoc from '../../components/AppHoc';
import FormHoc from '../../components/FormHoc';
import { styles } from '../Address/style';
import Loader from '../../components/Loader';
import { profileUpdate, profileCancel } from '../../store/profile/profileSlice';
import { cusid } from '../../store/auth/authSlice';

const validateschema = Yup.object().shape({
    fname: Yup.string().required('Enter first Name'),
    lname: Yup.string().required('Enter first Name'),
    email: Yup.string().required('Enter Email').email('Invalid email'),
    contactno: Yup.string().required('Enter contact no.'),
});

function Profile() {
    const dispatch = useDispatch();
    const cusId = useSelector(cusid);
    const { firstname, lastname, email, contactno } = useSelector((state) => state.profile);
    const isLoading = useSelector((state) => state.profile.profileLoading);

    useFocusEffect(
        useCallback(() => {
            return () => {
                dispatch(profileCancel());
            };
        }, [dispatch])
    );

    function updateprofile(values) {
        Keyboard.dismiss();
        const payload = {
            cus_id: cusId,
            firstname: values.fname,
            lastname: values.lname,
            email: values.email,
            contactno: values.contactno,
        };
        dispatch(profileUpdate(payload));
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
                    initialValues={{ fname: firstname, lname: lastname, contactno: contactno, email: email}}
                    onSubmit={values => updateprofile(values)}
                >
                    {({ handleChange, handleBlur, touched, errors, handleSubmit, values }) => (
                    <>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>First Name</Text>
                        <TextInput
                            style={[styles.inputfield, styles.passwordfield, touched.fname && errors.fname ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('fname')}
                            onBlur={handleBlur('fname')}
                            value={values.fname}
                        />
                        {touched.fname && errors.fname && <Text style={styles.errortext}>{errors.fname}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Last Name</Text>
                        <TextInput
                            style={[styles.inputfield, styles.passwordfield, touched.lname && errors.lname ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('lname')}
                            onBlur={handleBlur('lname')}
                            value={values.lname}
                        />
                        {touched.lname && errors.lname && <Text style={styles.errortext}>{errors.lname}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Email</Text>
                        <TextInput
                            keyboardType="email-address"
                            style={[styles.inputfield, styles.passwordfield, styles.valid]}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            editable={false}
                        />
                        {touched.email && errors.email && <Text style={styles.errortext}>{errors.email}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Contact number</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={[styles.inputfield, styles.passwordfield, touched.contactno && errors.contactno ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('contactno')}
                            onBlur={handleBlur('contactno')}
                            value={values.contactno}
                        />
                        {touched.contactno && errors.contactno && <Text style={styles.errortext}>{errors.contactno}</Text>}
                    </View>
                    <Pressable style={styles.savebutton} onPress={handleSubmit}>
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

export default AppHoc(FormHoc(Profile));
