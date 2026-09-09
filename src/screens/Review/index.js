import { useCallback, useMemo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import AppHoc from '../../components/AppHoc';
import ReviewCard from './ReviewCard';
import { AppIcon } from '../../img/AppIcon';
import { styles } from './style';
import { selectReviewById, listFetch, listCancel, listLoadmore } from '../../store/review/reviewSlice';
import Loader from '../../components/Loader';
import Theme from '../../components/Theme';

const Review = () => {
    const route = useRoute();
    const dispatch = useDispatch();
    const productId = route.params.id;
    const count = route.params.count;
    const average = route.params.average;
    const listLoading = useSelector((state) => state.review.listLoading);
    const revdata = useSelector(selectReviewById(productId));

    useFocusEffect(
        useCallback(() => {
            if (revdata === undefined) {
                dispatch(listFetch({ product_id: productId, page: 1 }) );
            }
            return () => {
                dispatch(listCancel());
            };
        }, [dispatch, productId, revdata])
    );

    const renderReview = useCallback(({ item }) => {
        return <ReviewCard data={item} />;
    }, []);

    const loadmore = useCallback(() => {
        if (revdata?.loadmore) {
            dispatch(listLoadmore({ product_id: productId, page: revdata?.page }));
        }
    }, [dispatch, revdata, productId]);

    const renderheader = () => {
        return (
            <View style={styles.reviewcontainer}>
                <Text>{`(${average})`}</Text>
                <View style={styles.starcontainer}>
                    {[1, 2, 3, 4, 5].map((num) => num <= average ? <AppIcon.StarFilled key={num} width={20} height={20} /> : <AppIcon.Star key={num} width={20} height={20} />)}
                </View>
                <Text style={styles.reviewtext}>{`(${count} Customer reviews)`}</Text>
            </View>
        );
    };

    const rowseparator = () =>  <View  style={styles.itemseparator} />;

    const renderfooter = useMemo(() => {
        return revdata?.loadmore ? (
            <View style={styles.loaderContainer}>
                <Text style={styles.loadertext}>Hang on, loading more...</Text>
                <ActivityIndicator size="large" color={Theme.colors.secondary} />
            </View>
        ) : null;
    }, [revdata?.loadmore]);

    return (
        <View style={styles.pagecontainer}>
            {listLoading ?
                <Loader bgcolor="#fff" />
            :
            Array.isArray(revdata?.reviewlist) && revdata.reviewlist.length > 0 && (
                <FlashList
                    contentContainerStyle={styles.listcontainer}
                    data={revdata?.reviewlist ?? []}
                    renderItem={renderReview}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    ListHeaderComponent={renderheader}
                    ItemSeparatorComponent={rowseparator}
                    ListFooterComponent={renderfooter}
                    onEndReached={loadmore}
                    onEndReachedThreshold={0.5}
                />
            )}
        </View>
    );
};

export default AppHoc(Review);
