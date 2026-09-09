import { useState, useEffect, memo } from 'react';
import { Modal, TouchableWithoutFeedback, Text, View, Pressable, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';
import { filterlist, setSort } from '../../../store/filter/filterSlice';
import { listEmpty } from '../../../store/productlist/productlistSlice';
import { AppIcon } from '../../../img/AppIcon';

const sortoption = [
    { label: 'Latest', value: 'newest' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Price : Low to High', value: 'low-to-high' },
    { label: 'Price : High to Low', value: 'high-to-low' },
];

function SortModal({ ref, catId }) {
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const [modalVisible, setModalVisible] = useState(false);
    const filterdata = useSelector(filterlist(catId));
    const [sortby, setSortby] = useState('popularity');
    const modalheight = (252 + insets.bottom);

    useEffect(() => {
        if (filterdata?.sort) {
            setSortby(filterdata?.sort);
        }
    }, [filterdata]);

    ref.current = {
        openmodal,
    };

    function openmodal() {
        setModalVisible(true);
    }

    function hidemodal() {
        setModalVisible(false);
    }

    function handleSort(option) {
        if (option !== sortby) {
            dispatch(setSort({ cat_id: catId, sort: option }));
            dispatch(listEmpty({ cat_id: catId }));
        }
        hidemodal();
    }

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={hidemodal}
            >
                <TouchableWithoutFeedback onPress={hidemodal}>
                    <View style={styles.modalbackdrop} />
                </TouchableWithoutFeedback>
                <View pointerEvents="box-none" style={[styles.modalouter, { paddingTop: insets.top }]}>
                    <View style={[styles.modalcontent, { height: modalheight, width }]}>
                        <View style={styles.titlecontainer}>
                            <Text style={styles.modalheading}>Sort by</Text>
                            <Pressable onPress={hidemodal} style={styles.closebtn}>
                                <AppIcon.CloseDark width={12} height={12} />
                            </Pressable>
                        </View>
                        {sortoption.map(item => (
                            <Pressable key={item.value} style={styles.sortbtn} onPress={() => handleSort(item.value)}>
                                <>
                                <Text style={styles.sortbtnlabel}>{item.label}</Text>
                                <View style={[styles.radiouter, sortby === item.value ? styles.radiouteractive : styles.radiouterinactive]}>
                                    {sortby === item.value && <View style={styles.radioinner} />}
                                </View>
                                </>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default memo(SortModal);
