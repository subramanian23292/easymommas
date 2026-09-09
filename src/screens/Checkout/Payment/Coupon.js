import { useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../style';
import { applyCoupon, couponRemove } from '../../../store/checkout/checkoutSlice';
import { AppIcon } from '../../../img/AppIcon';
import CouponModal from './CouponModal';
import { notifySingle } from '../../../components/Toast';

const Coupon = () => {
    const couponmodalRef = useRef();
    const dispatch = useDispatch();
    const cusId = useSelector(state => state.auth.cusId);
    const appliedcoupon = useSelector(state => state.checkout.couponcode);
    const [couponcode, setCouponcode] = useState('');

    const applyingCoupon = (code) => {
        const codeToUse = code ?? couponcode;
        if (codeToUse !== '') {
            Keyboard.dismiss();
            dispatch(applyCoupon({ action: 'applycoupon', cus_id: cusId, couponcode: codeToUse }));
        } else {
            notifySingle('snackbar', {
                params: {
                    title: 'Invalid coupon',
                },
            });
        }
    };

    const viewCoupons = () => {
        if (couponmodalRef.current) {
            couponmodalRef.current.openmodal();
        }
    };

    const removeCoupon = () => {
        dispatch(couponRemove());
        setCouponcode('');
    };

    return (
        <>
        <View style={[styles.totalItem, styles.couponouter]}>
            <TextInput
                style={styles.couponinput}
                placeholder="Coupon code"
                placeholderTextColor="rgba(0,0,0,.4)"
                onChangeText={setCouponcode}
                value={couponcode}
            />
            <Pressable style={styles.applybtn} onPress={() => applyingCoupon()}>
                <Text style={styles.applytext}>Apply</Text>
            </Pressable>
        </View>
        <View style={styles.couponouterContainer}>
            {appliedcoupon !== '' ?
            <View style={styles.appliedcouponouter}>
                <Text style={styles.appliedcouponcode}>{appliedcoupon}</Text>
                <Pressable onPress={removeCoupon}><AppIcon.CloseDark width={10} height={10} /></Pressable>
            </View>:
            <View />}
            <Pressable style={styles.viewoffersbtn} onPress={viewCoupons}>
                <Text style={styles.viewoffers}>View offers {'&'} coupons</Text>
            </Pressable>            
        </View>
        <CouponModal ref={couponmodalRef} setCouponcode={setCouponcode} applyingCoupon={applyingCoupon} />
        </>
    );
};

export default Coupon;
