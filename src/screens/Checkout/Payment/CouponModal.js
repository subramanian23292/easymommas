import { useState, memo, useCallback } from 'react';
import { Modal, Text, View, Pressable, useWindowDimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppIcon } from '../../../img/AppIcon';
import { styles } from './couponstyle';
import { listcoupons, fetchCoupon, cancelCoupon } from '../../../store/checkout/checkoutSlice';

const CouponModal = ({ref, setCouponcode, applyingCoupon}) => {
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const cusId = useSelector(state => state.auth.cusId);
  const couponlist = useSelector(listcoupons);

  ref.current = {
    openmodal,
  };

  function openmodal() {
    setModalVisible(true);
    if (couponlist.length === 0) {
      dispatch(fetchCoupon({ action: 'listcoupon', cus_id: cusId }));
    }
  }

  function hidemodal() {
    setModalVisible(false);
    dispatch(cancelCoupon());
  }

  const setCoupon = (couponCode) => {
    setCouponcode(couponCode);
    hidemodal();    
    applyingCoupon(couponCode);
  };

  const renderCoupon = useCallback(({item}) => {
    return (
      <View style={styles.itemcontainer}>
        <Text style={styles.couponame}>{item.name}</Text>
        <Text style={styles.coupondiscount}>Discount {item.discount}</Text>
        <Pressable style={styles.couponbtn} onPress={() => setCoupon(item.code)}>
          <Text style={styles.couponcode}>{item.code}</Text>
        </Pressable>
      </View>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function rowseparator() {
    return <View style={styles.itemseparator} />;
  }

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hidemodal}
      >        
        <View 
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.modalouter, { paddingTop: Platform.OS === 'ios' ? insets.top : null, paddingBottom: Platform.OS === 'ios' ? insets.bottom : null }]}>
          <View style={[styles.modalcontent, { height, width }]}>
            <View style={styles.titlecontainer}>
              <Text style={styles.modalheading}>Available offers {'&'} coupons</Text>
              <Pressable onPress={hidemodal} style={styles.closebtn}>
                <AppIcon.CloseDark width={12} height={12} />
              </Pressable>
            </View>
            <View style={styles.couponlistcontainer}>
              {Array.isArray(couponlist) && couponlist.length > 0 && (
                <FlashList
                  contentContainerStyle={styles.listcontainer}
                  data={couponlist ?? []}
                  renderItem={renderCoupon}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  ItemSeparatorComponent={rowseparator}
                />
              )}
              {(couponlist === undefined || couponlist.length === 0) && (
                <View style={styles.nodatafound}>
                  <Text style={styles.nodatafoundtext}>No coupons available</Text>
                </View>
              )}
            </View>            
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(CouponModal);
