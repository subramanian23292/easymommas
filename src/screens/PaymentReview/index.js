import { useState, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AppHoc from '../../components/AppHoc';
import { styles } from './style';
import Loader from '../../components/Loader';
import { capturepaymentApi } from '../../components/api';
import { AppIcon } from '../../img/AppIcon';

function PaymentReview() {
  const route = useRoute();
  const navigation = useNavigation();
  const payurl = route.params.payurl;
  const order_id = route.params.order_id;
  const cusId = useSelector(state => state.auth.cusId);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const isProcessing = useRef(false);

  const cancelPayment = () => {
    navigation.popTo('Payment', { paymentStatus: 'cancelled' });
  };

  const onUrlChange = (webviewState) => {
    const currentUrl = webviewState.url;
    if (currentUrl.includes('cancel.php')) {
      cancelPayment();
    }
    if (currentUrl.includes('return.php') && !isProcessing.current) {
      const match = currentUrl.match(/[?&]token=([^&]+)/);
      const orderId = match ? match[1] : null;
      if (!orderId) {
        cancelPayment();
      } else {
        isProcessing.current = true;
        capturePayment(orderId);
      }
    }
  };

  const capturePayment = async (orderId) => {
    const payload = { orderID: orderId, order_id, cus_id: cusId };
    setProcessing(true);
    try {
        const response = await capturepaymentApi(payload);
        if (response.status === 200) {
          if (response.data?.status === 'COMPLETED') {
            navigation.navigate('Success', { id: response.data.order_no });
          } else {
            cancelPayment();
          }
        } else {
          cancelPayment();
        }
        setProcessing(false);
    } catch(e) {
    }
  };

  return (
    <>
    <Pressable onPress={cancelPayment} style={styles.closebutton}>
      <AppIcon.CloseDark width={14} height={14} />
    </Pressable>
    <View style={styles.paymentcontainer}>
      {loading && <Loader />}
      {processing && <Loader />}
      <WebView
        onNavigationStateChange={onUrlChange}
        source={{ uri: payurl }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        scalesPageToFit={false}
      />
    </View>
    </>
  );
}

export default AppHoc(PaymentReview);
