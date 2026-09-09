import React, { useEffect } from 'react';
import { View, Text, Pressable, BackHandler } from 'react-native';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';
import { resetToHome } from '../../store/checkout/checkoutSlice';

const Success = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => backHandler.remove();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackPress = () => {
    returnHome();
    return true;
  };

  const returnHome = () => {
    dispatch(resetToHome());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <View style={styles.successcontainer}>
      <View style={styles.lottiecont}>
        <LottieView
          style={styles.lottieview}
          source={require('../../img/success.json')}
          autoPlay
          loop={false}
        />
      </View>
      <Text style={styles.thanktxt}>Thank you for your order.</Text>
      <Text style={styles.ordertxt}>We received your order. Your order reference number is: {'#'}{id}.</Text>
      <Pressable style={styles.backbtn} onPress={returnHome}>
        <Text style={styles.backbtnText}>Back</Text>
      </Pressable>
    </View>
  );
};

export default AppHoc(Success);
