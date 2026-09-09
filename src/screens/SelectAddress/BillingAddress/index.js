import { View, Text, TextInput, Pressable, ScrollView, Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AppHoc from '../../../components/AppHoc'
import FormHoc from '../../../components/FormHoc';
import { styles } from '../../Address/style';
import { setBillingaddr } from '../../../store/checkout/checkoutSlice';

const validateschema = Yup.object().shape({
    fname: Yup.string().required('Enter First name'),
    lname: Yup.string().required('Enter Last name'),
    phonenumber: Yup.string().required('Enter Contact no.'),
    addressone: Yup.string().required('Enter Address'),
    city: Yup.string().required('Enter City'),
    zipcode: Yup.string().required('Enter Zipcode'),
    state: Yup.string().required('Enter State'),
    country: Yup.string().required('Enter Country'),
});

function BillingAddress() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const biladdr = useSelector((state) => state.checkout.billingAddress);

    function handlebilladdr(values) {
        Keyboard.dismiss();
        const payload = {
            fname: values.fname,
            lname: values.lname,
            addrone: values.addressone,
            addrtwo: values.addresstwo,
            postcode: values.zipcode,
            contactno: values.phonenumber,
            state: values.state,
            city: values.city,
            country: values.country,
        };
        dispatch(setBillingaddr(payload));
        navigation.goBack();
    }

    return (
        <ScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={styles.scrollcontainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
        >
            <View style={styles.formcontainer}>
                <Formik
                    validationSchema={validateschema}
                    initialValues={{ fname: biladdr?.fname ?? '', lname: biladdr?.lname ?? '', phonenumber: biladdr?.contactno ?? '', addressone: biladdr?.addrone ?? '', addresstwo: biladdr?.addrtwo ?? '', city: biladdr?.city ?? '', zipcode: biladdr?.postcode ?? '', state: biladdr?.state ?? '', country: biladdr?.country ?? '' }}
                    onSubmit={values => handlebilladdr(values)}
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
                        <Text style={styles.fieldlabel}>Address 1</Text>
                        <TextInput
                            style={[styles.inputfield, touched.addressone && errors.addressone ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('addressone')}
                            onBlur={handleBlur('addressone')}
                            value={values.addressone}
                        />
                        {touched.addressone && errors.addressone && <Text style={styles.errortext}>{errors.addressone}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Address 2</Text>
                        <TextInput
                            style={[styles.inputfield, styles.valid]}
                            onChangeText={handleChange('addresstwo')}
                            onBlur={handleBlur('addresstwo')}
                            value={values.addresstwo}
                        />
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Zipcode</Text>
                        <TextInput
                            style={[styles.inputfield, touched.zipcode && errors.zipcode ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('zipcode')}
                            onBlur={handleBlur('zipcode')}
                            value={values.zipcode}
                        />
                        {touched.zipcode && errors.zipcode && <Text style={styles.errortext}>{errors.zipcode}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>City</Text>
                        <TextInput
                            style={[styles.inputfield, touched.city && errors.city ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('city')}
                            onBlur={handleBlur('city')}
                            value={values.city}
                        />
                        {touched.city && errors.city && <Text style={styles.errortext}>{errors.city}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>State</Text>
                        <TextInput
                            style={[styles.inputfield, touched.state && errors.state ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('state')}
                            onBlur={handleBlur('state')}
                            value={values.state}
                        />
                        {touched.state && errors.state && <Text style={styles.errortext}>{errors.state}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Country</Text>
                        <TextInput
                            style={[styles.inputfield, touched.country && errors.country ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('country')}
                            onBlur={handleBlur('country')}
                            value={values.country}
                        />
                        {touched.country && errors.country && <Text style={styles.errortext}>{errors.country}</Text>}
                    </View>
                    <View style={styles.fieldcontainer}>
                        <Text style={styles.fieldlabel}>Contact no{'.'}</Text>
                        <TextInput
                            keyboardType="number-pad"
                            style={[styles.inputfield, touched.phonenumber && errors.phonenumber ? styles.invalid : styles.valid]}
                            onChangeText={handleChange('phonenumber')}
                            onBlur={handleBlur('phonenumber')}
                            value={values.phonenumber}
                        />
                        {touched.phonenumber && errors.phonenumber && <Text style={styles.errortext}>{errors.phonenumber}</Text>}
                    </View>
                    <Pressable style={styles.savebutton} onPress={handleSubmit}>
                        <Text style={styles.savebuttonlabel}>Save</Text>
                    </Pressable>
                    </>
                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}

export default AppHoc(FormHoc(BillingAddress));
