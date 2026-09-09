import { useCallback } from 'react';
import { View, Text, ScrollView, TextInput, Keyboard, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AppHoc from '../../components/AppHoc';
import FormHoc from '../../components/FormHoc';
import { styles } from './style';
import { AppIcon } from '../../img/AppIcon';
import Loader from '../../components/Loader';
import { submitReview, reviewCancel } from '../../store/order/orderSlice';

const validateschema = Yup.object().shape({
  rating: Yup.number().required('Enter rating').min(1, 'Enter rating'),
  comment: Yup.string().required('Enter Review'),
});

const WriteReview = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const ordid = route.params?.orderid;
  const prodid = route.params?.pid;
  const cusId = useSelector(state => state.auth.cusId);
  const revLoading = useSelector((state) => state.order.revLoading);

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(reviewCancel());
      };
    }, [dispatch])
  );

  const submitreview = (values) => {
    Keyboard.dismiss();
    const payload = {
      cus_id: cusId,
      rating: values.rating,
      comment: values.comment,
      ordid,
      prodid,
    };
    dispatch(submitReview(payload));
  };

  const updaterating = (rating, setFieldValue) => {
    setFieldValue('rating', rating);
  };

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
          initialValues={{ rating: 0, comment: '' }}
          onSubmit={values => submitreview(values)}
        >
          {({ handleChange, handleBlur, touched, errors, handleSubmit, values, setFieldValue }) => (
          <>
          <View style={styles.fieldcontainer}>
            <Text style={styles.fieldlabel}>Rating</Text>
            <View style={styles.starcontainer}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Pressable key={item} onPress={() => updaterating(item, setFieldValue)}>
                  {item <= values.rating ? <AppIcon.StarFilled width={26} height={26} /> : <AppIcon.Star width={26} height={26} />}
                </Pressable>
              ))}
            </View>
            {touched.rating && errors.rating && <Text style={styles.errortext}>{errors.rating}</Text>}
          </View>
          <View style={styles.fieldcontainer}>
            <Text style={styles.fieldlabel}>Comment</Text>
            <TextInput
              numberOfLines={6}
              multiline={true}
              textAlignVertical="top"
              style={[styles.inputfield, touched.comment && errors.comment ? styles.invalid : styles.valid]}
              onChangeText={handleChange('comment')}
              onBlur={handleBlur('comment')}
              value={values.comment}
            />
            {touched.comment && errors.comment && <Text style={styles.errortext}>{errors.comment}</Text>}
          </View>
          <Pressable style={styles.savebutton} onPress={handleSubmit}>
            <Text style={styles.savebuttonlabel}>Submit</Text>
          </Pressable>
          </>
          )}
        </Formik>
      </View>
    </ScrollView>
    {revLoading && <Loader bgcolor={'rgba(255, 255, 255, 0.5)'} />}
    </>
  );
};

export default AppHoc(FormHoc(WriteReview));
