import { useCallback } from 'react';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AppHoc from '../../components/AppHoc';
import AddressCard from './AdressCard';
import { styles } from './style';
import Footer from './Footer';
import { listaddress, fetchAddress, cancelAddress } from '../../store/address/addressSlice';
import Loader from '../../components/Loader';
import AddressLoader from '../../components/Loader/AddressLoader';

function AddressList() {
    const dispatch = useDispatch();
    const fetchLoading = useSelector((state) => state.address.fetchLoading);
    const addresslist = useSelector(listaddress);
    const cusId = useSelector(state => state.auth.cusId);

    useFocusEffect(
        useCallback(() => {
            if (addresslist.length === 0) {
                dispatch(fetchAddress({ action: 'listaddress', cus_id: cusId }));
            }
            return () => {
                dispatch(cancelAddress());
            };
        }, [addresslist.length, cusId, dispatch])
    );

    const renderAddress = ({ item }) => <AddressCard data={item} />;
    const renderSeparator = () => <View style={styles.itemseparator} />;

    return (
        <>
        <View style={styles.pagecontainer}>
            {fetchLoading ?
                <Loader bgcolor="#fff" />
            :
            Array.isArray(addresslist) && addresslist.length > 0 && (
                <FlashList
                    contentContainerStyle={styles.listcontainer}
                    data={addresslist ?? []}
                    renderItem={renderAddress}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    ItemSeparatorComponent={renderSeparator}
                />
            )}
            {!fetchLoading && (addresslist === undefined || addresslist.length === 0) && (
                <View style={styles.nodatafound}>
                    <Text style={styles.nodatafoundtext}>No Address found</Text>
                </View>
            )}
        </View>
        {!fetchLoading && <Footer />}
        <AddressLoader />
        </>
    );
}

export default AppHoc(AddressList);
